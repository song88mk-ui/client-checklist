<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { type EditProductPayload } from '$api/request.DTO.model';
	import ProductForm, { type ProductFormType } from '../ProductForm';
	import steps from '$stores/steps';
	import Product from '$utils/client';
	import Alert from '../Alert.svelte';
	import type { ClientInformationFormType } from '../ClientInformationForm';

	import { servicesTypeId } from '$constants/services';
	import Environment from '$enums/Environment';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Step from '$enums/Step';
	import auth from '$stores/auth';
	import { hasBetValidation, sportsFeed } from '$stores/client-launch-feed';
	import selectedIntegration from '$stores/integration';
	import initialFormValues from '$constants/initialFormValues';
	import { goto } from '$app/navigation';
	import { generateSubTask } from '$constants/commonValues';
	import IntegrationType from '$enums/integrationType';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import getOverallStatus from '$utils/getOverallStatus';
	import { toCreateClientPayload, toEditClientPayload } from '$mapper/ClientMapper';
	import isErrorValidation from '$stores/validation';
	import type { ClientSubTaskFormType } from '$lib/ProductForm/validationSchema';
	import { ErrorValidationType } from '$enums/ErrorValidationType';
	import { StatusCode } from '$api/models';
	import { PageGuard } from '$services/PageGuard';
	import hasIncompleteSubtask from '$utils/hasIncompleteSubtask';

	const { createClient, createStep, updateStep, updateClient } = APIGateway();
	const {
		back,
		onFinishedSubmit,
		step,
		isEdit = false,
		isSuperAdmin
	} = $props<{
		back: () => void;
		onFinishedSubmit: () => void;
		step: number;
		isSuperAdmin?: boolean;
		isEdit?: boolean;
	}>();

	const serviceStep = Step[$selectedIntegration];
	const title = $steps[step].title;
	const dataKeys: string[] = [];

	const finishFormButtonLabel = (): string => {
		return isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';
	};

	const defaultValues = initialFormValues[$selectedIntegration][step];

	// TODO: Need to refactor to make it clean; Bet validation from MTS form for odds feed integration
	const mtsFormData = $steps[serviceStep.ManagedTradingServices].formData;
	if (
		$selectedIntegration == IntegrationType.FEED_INTEGRATION &&
		mtsFormData &&
		(mtsFormData as ProductFormType)[Environment.STAGING].clientSubTasks[6].taskStatusId !==
			ClientRowStatus.NotApplicable
	) {
		defaultValues[Environment.STAGING] = {
			assignedTo: '',
			targetDateCompleted: null,
			actualDateCompleted: null,
			clientSubTasks: [generateSubTask(1, 'Bet Validation')]
		};

		dataKeys.push(Environment.STAGING);
	}

	const clientInfoFormData = $steps[serviceStep.ClientInformation].formData;
	const sportsListFormData = (clientInfoFormData as ClientInformationFormType).sports
		.split(',')
		.map((i) => i.trim())
		.filter((x) => x !== null);

	// TODO: Need to refactor; Sports list from Client Information form for odds feed integration; Create list of sports
	if ($selectedIntegration == IntegrationType.FEED_INTEGRATION && sportsListFormData.length > 0) {
		defaultValues[Environment.PRODUCTION] = {
			assignedTo: '',
			targetDateCompleted: null,
			actualDateCompleted: null,
			clientSubTasks: sportsListFormData.map((s, i) => generateSubTask(i + 1, s))
		};
	}

	// TODO: Need to refactor; Edit list of sports from client info page
	if ($steps[step]?.formData) {
		const newSubTasksSports: any[] = [];
		let listOfSports = ($steps[step].formData as ProductFormType)[Environment.PRODUCTION]
			.clientSubTasks;
		sportsListFormData.forEach((s, i) => {
			const clientInfoSport = listOfSports.find((ls) => ls.subtaskName == s);
			const confirmSports = clientInfoSport || generateSubTask(i + 1, s);
			newSubTasksSports.push(confirmSports);
		});

		($steps[step].formData as ProductFormType)[Environment.PRODUCTION].clientSubTasks =
			newSubTasksSports;
	}

    if ($hasBetValidation && !($steps[step]?.formData as ProductFormType)[Environment.STAGING]) {
        $steps[step].formData = {
            ...$steps[step].formData,
            [Environment.STAGING]: defaultValues[Environment.STAGING]
        }
    }

	dataKeys.push(Environment.PRODUCTION);
	let initialValues = ($steps[step]?.formData as ProductFormType) || defaultValues;
	let isLoading = $state(false);
	let message = $state('');
	let disabled = $state(false);

	$effect(() => {
		disabled = isEdit && !isSuperAdmin;
	});

	function hasOneCompletedTask(values: ProductFormType) {
		const checkStatus = (subTasks: ClientSubTaskFormType[]) =>
			subTasks && subTasks.some((task) => task.taskStatusId === ClientRowStatus.Completed);
		return Object.values(values).some(
			(value) => value.clientSubTasks && checkStatus(value.clientSubTasks)
		);
	}

	const handleSubmit = async (values: ProductFormType) => {
		if (disabled) {
			setTimeout(() => {
				goto('/');
			}, 3000);
			return;
		}

        const isClientCreation: boolean = !isEdit && isSuperAdmin && !values[Environment.STAGING]?.id && !values[Environment.PRODUCTION]?.id

		if (isClientCreation) {
            let newFormData: any = {
                [Environment.PRODUCTION]: values[Environment.PRODUCTION]
            }
            if (values[Environment.STAGING]) {
                newFormData = {
                    ...newFormData,
                    [Environment.STAGING]: values[Environment.STAGING]
                }
            }
			$steps[step].formData = newFormData;
		}

		const isTaskCompletionErrorCheck: boolean =
			hasOneCompletedTask(values) && $steps.some((step) => step.isIncomplete);
		const isTaskRequiredFieldsErrorCheck: boolean = $steps.some((step) => !step?.formData);

		if (isTaskCompletionErrorCheck || isTaskRequiredFieldsErrorCheck) {
			$isErrorValidation = {
				[ErrorValidationType.MissingRequiredFields]: isTaskRequiredFieldsErrorCheck,
				[ErrorValidationType.AllTasksCompletion]: isTaskCompletionErrorCheck
			};
			return;
		} else {
			$isErrorValidation = {
				[ErrorValidationType.MissingRequiredFields]: false,
				[ErrorValidationType.AllTasksCompletion]: false
			};
		}

		isLoading = true;

		let response;
		if (values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		if (response.some((res: any) => res.error)) {
			$steps[step].error = ErrorMessages.CreateProductFailed;
			isLoading = false;
			return;
		}

		if ($hasBetValidation) {
			const [stagingResponse, productionResponse] = response;

			if (stagingResponse.data && productionResponse.data) {
				$steps[step].formData = {
					[Environment.STAGING]: {
						id: stagingResponse.data.id,
						...values[Environment.STAGING]
					},
					[Environment.PRODUCTION]: {
						id: productionResponse.data.id,
						...values[Environment.PRODUCTION]
					}
				};
			}
		} else {
			const [productionResponse] = response;
			if (productionResponse.data) {
				$steps[step].formData = {
					[Environment.PRODUCTION]: {
						id: productionResponse.data.id,
						...values[Environment.PRODUCTION]
					}
				};
			}
		}

		const currentStatus = getOverallStatus($steps);
		const formData = $steps[serviceStep.ClientInformation].formData as ClientInformationFormType;

		const formattedData = {
			...toEditClientPayload($selectedIntegration, formData),
			taskStatus: currentStatus
		};
		if (formData.taskStatus !== currentStatus) {
			const response = await updateClient(formattedData, {
				'x-user-token': $auth?.userToken as string
			});

			$steps[serviceStep.ClientInformation].formData = {
				...formData,
				taskStatus: currentStatus
			};

			if (response.error) {
				$steps[step].error = ErrorMessages.UpdateClientFailed;
				return;
			}
		}

		onFinishedSubmit();

		setTimeout(() => {
			goto('/');
		}, 3000);
	};

	const handleCreateClient = async () => {
		const response = await createClient(
			toCreateClientPayload(
				$selectedIntegration,
				$steps[serviceStep.ClientInformation].formData as ClientInformationFormType
			),
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		if (response.statusCode === StatusCode.Success && response.data) {
			const sports: any = $steps[serviceStep.ClientInformation].formData?.sports;

			if (sports !== undefined && sports !== null) {
				$sportsFeed = sports
					.split(',')
					.map((item: string) => item.trim())
					.filter((item: string) => item !== '');
			}

			const newFormData = {
				...$steps[serviceStep.ClientInformation].formData,
				clientId: response.data
			};

			$steps[serviceStep.ClientInformation].formData = newFormData as ClientInformationFormType;

			return;
		}

		await PageGuard(response.error?.statusCode);
	};

    const handleCreateStep = async (stepIndex: number) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
        const stepItem: any = $steps[stepIndex];
		const stagingProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: stepItem.stepId,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 0,
				...stepItem.formData[Environment.STAGING]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const productionProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: stepItem.stepId,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 1,
				...stepItem.formData[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);

		if (response.some((res: any) => res.error)) {
			stepItem.error = ErrorMessages.CreateProductFailed;
            $steps[stepIndex] = stepItem;
			return;
		}

		const [stagingResponse, productionResponse] = response;

		if (stagingResponse.data && productionResponse.data) {
			stepItem.formData = {
				[Environment.STAGING]: {
					id: stagingResponse.data.id,
					...stepItem.formData[Environment.STAGING]
				},
				[Environment.PRODUCTION]: {
					id: productionResponse.data.id,
					...stepItem.formData[Environment.PRODUCTION]
				}
			};

			stepItem.isIncomplete = hasIncompleteSubtask(stepItem.formData);
            $steps[stepIndex] = stepItem;

			const currentStatus = getOverallStatus($steps);
			const formData = $steps[serviceStep.ClientInformation].formData as ClientInformationFormType;
			
			const formattedData = {
				...toEditClientPayload($selectedIntegration, formData),
				taskStatus: currentStatus
			}
			if (formData.taskStatus !== currentStatus) {
				const response = await updateClient(formattedData, {
					'x-user-token': $auth?.userToken as string
				});

				$steps[serviceStep.ClientInformation].formData = {
					...formData,
					taskStatus: currentStatus
				};

				if (response.error) {
					stepItem.error = ErrorMessages.UpdateClientFailed;
                    $steps[stepIndex] = stepItem;
					return;
				}
			}
		}
    }

	const handleCreateClientLaunchProduct = async (values: ProductFormType) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
		const promiseList: any = [];

		if ($hasBetValidation) {
			const stagingProduct = createStep(
				{
					clientId: (clientFormData as ClientInformationFormType).clientId || '',
					stepId: serviceStep.ClientLaunch,
					stepName: '',
					serviceTypeId: servicesTypeId[$selectedIntegration],
					environment: 0,
					...values[Environment.STAGING]
				},
				{
					'x-user-token': $auth?.userToken as string
				}
			);

			promiseList.push(stagingProduct);
		}

		const productionProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: serviceStep.ClientLaunch,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 1,
				...values[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		promiseList.push(productionProduct);
		const response = await Promise.all(promiseList);

		if (response.some((res) => res.message === 'Success' && res.statusCode === 100)) {
			message = `${Product[$selectedIntegration]} has been successfully created`;
		}
		return response;
	};

	const handleCreateProduct = async (values: ProductFormType) => {
        for (var stepIndex in $steps) {
            if ($steps[Number(stepIndex)].stepId === Step[$selectedIntegration].ClientInformation) {
                await handleCreateClient();

                continue;
            };

            if ($steps[Number(stepIndex)].stepId === Step[$selectedIntegration].ClientLaunch) {
                break;
            }

            await handleCreateStep(Number(stepIndex));
        }

        const response = await handleCreateClientLaunchProduct(values);

        return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const promiseList: any = [];
		if (values[Environment.STAGING] && values[Environment.STAGING].id) {
			const stagingProduct = updateStep(
				{
					...values[Environment.STAGING],
					stepName: ''
				} as EditProductPayload,
				{
					'x-user-token': $auth?.userToken as string
				}
			);

			promiseList.push(stagingProduct);
		}

		const productionProduct = updateStep(
			{
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		promiseList.push(productionProduct);

		const response = await Promise.all(promiseList);

		if (response.some((res) => res.message === 'Success' && res.statusCode === 100)) {
			message = `${Product[$selectedIntegration]} has been successfully updated`;
		}

		return response;
	};
</script>

{#if $steps[step].error}
	<div class="mb-5">
		<Alert variant="error" message={$steps[step].error} hasCloseButton={false} />
	</div>
{/if}

{#if message}
	<div class="mb-5">
		<Alert variant="success" {message} hasCloseButton={false} />
	</div>
{/if}

<div class="cc-client-launch">
	<ProductForm
		isLaunch={true}
		finishFormButtonLabel={finishFormButtonLabel()}
		{title}
		{initialValues}
		{back}
		{isLoading}
		{disabled}
		onSubmit={handleSubmit}
		{dataKeys}
		serviceType={IntegrationType.FEED_INTEGRATION}
	/>
</div>

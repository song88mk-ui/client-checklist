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
    import type {default as StepType} from '$types/Step';
	import auth from '$stores/auth';
	import selectedIntegration from '$stores/integration';
	import initialFormValues from '$constants/initialFormValues';
	import { goto } from '$app/navigation';
	import getOverallStatus from '$utils/getOverallStatus';
	import { toCreateClientPayload, toEditClientPayload } from '$mapper/ClientMapper';
	import isErrorValidation from '$stores/validation';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import type { ClientSubTaskFormType } from '$lib/ProductForm/validationSchema';
	import { ErrorValidationType } from '$enums/ErrorValidationType';
	import { PageGuard } from '$services/PageGuard';
	import { StatusCode } from '$api/models';
	import { sportsFeed } from '$stores/client-launch-feed';
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

	const title = $steps[step].title;

	const finishFormButtonLabel = (): string => {
		return isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';
	};

	const defaultValues = initialFormValues[$selectedIntegration][step];
	let initialValues = ($steps[step].formData as ProductFormType) || defaultValues;

	let error = $state('');
	let isLoading = $state(false);
	let message = $state('');
	let disabled = $state(false);
	const serviceStep = Step[$selectedIntegration];

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
            $steps[step].formData = {
				[Environment.PRODUCTION]: {
					...values[Environment.PRODUCTION]
				}
			};
        }

        const isTaskCompletionErrorCheck: boolean = hasOneCompletedTask(values) && $steps.some((step) => step.isIncomplete);
        const isTaskRequiredFieldsErrorCheck: boolean = $steps.some((step) => !step?.formData);

		if (isTaskCompletionErrorCheck || isTaskRequiredFieldsErrorCheck) {
			$isErrorValidation = {
                [ErrorValidationType.MissingRequiredFields]: isTaskRequiredFieldsErrorCheck,
                [ErrorValidationType.AllTasksCompletion]: isTaskCompletionErrorCheck
            }
			return;
		} else {
            $isErrorValidation = {
                [ErrorValidationType.MissingRequiredFields]: false,
                [ErrorValidationType.AllTasksCompletion]: false
            }
		}

		isLoading = true;

		let response;
		if (values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		if (response.error) {
			error = ErrorMessages.CreateProductFailed;
			isLoading = false;
			return;
		}

		if (response.data) {
			$steps[step].formData = {
				[Environment.PRODUCTION]: {
					id: response.data.id,
					...values[Environment.PRODUCTION]
				}
			};

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
					error = ErrorMessages.CreateProductFailed;
					return;
				}
			}
		}

		onFinishedSubmit();

		setTimeout(() => {
			goto('/');
		}, 3000);
	};

    const serviceSteps = Step[$selectedIntegration];

    const handleCreateClient = async () => {
        const response = await createClient(toCreateClientPayload($selectedIntegration, $steps[serviceSteps.ClientInformation].formData as ClientInformationFormType), {
            'x-user-token': $auth?.userToken as string
        });

        if (response.statusCode === StatusCode.Success && response.data) {
            const sports: any = $steps[serviceSteps.ClientInformation].formData?.sports;

            if (sports !== undefined && sports !== null) {
                $sportsFeed = sports
                    .split(',')
                    .map((item: string) => item.trim())
                    .filter((item: string) => item !== '');
            }

            const newFormData = {
                ...$steps[serviceSteps.ClientInformation].formData,
                clientId: response.data
            }

            $steps[serviceSteps.ClientInformation].formData = newFormData as ClientInformationFormType

            return;
        }

        await PageGuard(response.error?.statusCode);
    }

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

		// if (response.some((res: any) => res.error)) {
		// 	error = ErrorMessages.CreateProductFailed;
		// 	return;
		// }

		const [stagingResponse, productionResponse] = response;

		if (stagingResponse.data && productionResponse.data) {
			$steps[stepIndex].formData = {
				[Environment.STAGING]: {
					id: stagingResponse.data.id,
					...stepItem[Environment.STAGING]
				},
				[Environment.PRODUCTION]: {
					id: productionResponse.data.id,
					...stepItem[Environment.PRODUCTION]
				}
			};

			$steps[stepIndex].isIncomplete = hasIncompleteSubtask($steps[stepIndex].formData);

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

				// if (response.error) {
				// 	error = ErrorMessages.CreateProductFailed;
				// 	return;
				// }
			}
		}
    }

    const handleCreateClientLaunchProduct = async(values: ProductFormType) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
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

		const response = await productionProduct;
		if (response.message === 'Success' && response.statusCode === 100) {
			message = `${Product[$selectedIntegration]} has been successfully created`;
		}
		return response;
    }

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
		const productionProduct = updateStep(
			{
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await productionProduct;
		if (response.message === 'Success' && response.statusCode === 100) {
			message = `${Product[$selectedIntegration]} has been successfully updated`;
		}

		return response;
	};

	$effect(() => {
		if (error) {
			setTimeout(() => {
				error = '';
			}, 5000);
		}
	});
</script>

{#if error}
	<div class="mb-5">
		<Alert variant="error" message={error} hasCloseButton={false} />
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
	/>
</div>

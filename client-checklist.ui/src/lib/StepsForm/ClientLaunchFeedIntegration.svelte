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
	import environment from '$enums/Environment';
	import getOverallStatus from '$utils/getOverallStatus';
	import { toEditClientPayload } from '$mapper/ClientMapper';

	const { createStep, updateStep, updateClient } = APIGateway();
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

	const mtsFormData = $steps[serviceStep.ManagedTradingServices].formData;
	// TODO: Need to refactor to make it clean; Bet validation from MTS form for odds feed integration
	if ($selectedIntegration == IntegrationType.FEED_INTEGRATION && (mtsFormData as ProductFormType)[Environment.STAGING].clientSubTasks[6].taskStatusId !== ClientRowStatus.NotApplicable) {
		defaultValues[Environment.STAGING] = {
			assignedTo: '',
			targetDateCompleted: null,
			actualDateCompleted: null,
			clientSubTasks: [generateSubTask(1, 'Bet Validation')]
		};

		dataKeys.push(Environment.STAGING);
	}

	const clientInfoFormData = $steps[serviceStep.ClientInformation].formData;
	const sportsListFormData = (clientInfoFormData as ClientInformationFormType).sports.split(',').map(i => i.trim()).filter(x => x !== null);

	console.log('SPORTS', sportsListFormData);
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
	const clientLaunchFormData = $steps[step].formData;

	if ($selectedIntegration == IntegrationType.FEED_INTEGRATION && clientLaunchFormData) {
		const newSubTasksSports: any[] = [];
		let listOfSports = (clientLaunchFormData as ProductFormType)[Environment.PRODUCTION].clientSubTasks;
		sportsListFormData.forEach((s, i) => {
			const clientInfoSport = listOfSports.find(ls => ls.subtaskName == s);
			console.log('CLIENT INFO SPORTS', clientInfoSport);

			const confirmSports = clientInfoSport || generateSubTask(i + 1, s);
			newSubTasksSports.push(confirmSports);
		});

		(clientLaunchFormData as ProductFormType)[Environment.PRODUCTION].clientSubTasks = newSubTasksSports;
	}

	dataKeys.push(Environment.PRODUCTION);
	let initialValues = clientLaunchFormData as ProductFormType || defaultValues;
	let error = $state('');
	let isLoading = $state(false);
	let message = $state('');
	let disabled = $state(false);

	$effect(() => {
		disabled = isEdit && !isSuperAdmin;
	});

	const handleSubmit = async (values: ProductFormType) => {
		if (disabled) {
			setTimeout(() => {
				goto('/');
			}, 3000);
			return;
		}

		isLoading = true;

		let response;
		if (values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		if (response.some((res: any) => res.error)) {
			error = ErrorMessages.CreateProductFailed;
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
				error = ErrorMessages.CreateProductFailed;
				return;
			}
		}

		onFinishedSubmit();

		setTimeout(() => {
			goto('/');
		}, 3000);
	};

	const handleCreateProduct = async (values: ProductFormType) => {
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

	const handleEditProduct = async (values: ProductFormType) => {
		const promiseList: any = [];
		if (values[Environment.STAGING]) {
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
	<ProductForm isLaunch={true} finishFormButtonLabel={finishFormButtonLabel()} {title} {initialValues} {back}
				 {isLoading} {disabled} onSubmit={handleSubmit} dataKeys={dataKeys}
				 serviceType={IntegrationType.FEED_INTEGRATION} />

</div>

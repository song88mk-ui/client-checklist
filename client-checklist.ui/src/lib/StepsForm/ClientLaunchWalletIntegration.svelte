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
	import selectedIntegration from '$stores/integration';
	import initialFormValues from '$constants/initialFormValues';
	import { goto } from '$app/navigation';
	import getOverallStatus from '$utils/getOverallStatus';
	import { toEditClientPayload } from '$mapper/ClientMapper';
	import isErrorValidation from '$stores/validation';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import type { ClientSubTaskFormType } from '$lib/ProductForm/validationSchema';

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

	const title = $steps[step].title;

	const finishFormButtonLabel = (): string => {
		return isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';
	};

	const defaultValues = initialFormValues[$selectedIntegration][step];
	let initialValues = $steps[step].formData as ProductFormType || defaultValues;


	let error = $state('');
	let isLoading = $state(false);
	let message = $state('');
	let disabled = $state(false);
	const serviceStep = Step[$selectedIntegration];

	$effect(() => {
		disabled = isEdit && !isSuperAdmin;
	});

	function hasOneCompletedTask(values: ProductFormType) {
    const checkStatus = (subTasks: ClientSubTaskFormType[]) => subTasks && subTasks.some(task => task.taskStatusId === ClientRowStatus.Completed);  
    return Object.values(values).some(value => value.clientSubTasks && checkStatus(value.clientSubTasks));
	}

	const handleSubmit = async (values: ProductFormType) => {
		if (disabled) {
			setTimeout(() => {
				goto('/');
			}, 3000);
			return;
		}

		if (hasOneCompletedTask(values) && $steps.some(step => step.isIncomplete)) {
			$isErrorValidation = true;
			return;
		} else {
			$isErrorValidation = false;
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
		}

		onFinishedSubmit();

		setTimeout(() => {
			goto('/');
		}, 3000);
	};

	const handleCreateProduct = async (values: ProductFormType) => {
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
	<ProductForm isLaunch={true} finishFormButtonLabel={finishFormButtonLabel()} {title} {initialValues} {back}
							 {isLoading} {disabled} onSubmit={handleSubmit} />

</div>

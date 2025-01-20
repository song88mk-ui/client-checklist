<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { type EditProductPayload } from '$api/request.DTO.model';
	import { goto } from '$app/navigation';
	import { ClientLaunchValuesWalletIntegration } from '$constants/productFormValues';
	import { servicesTypeId } from '$constants/services';
	import Environment from '$enums/Environment';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Step from '$enums/Step';
	import auth from '$stores/auth';
	import selectedIntegration from '$stores/integration';
	import steps from '$stores/steps';
	import Product from '$utils/client';
	import Alert from '../Alert.svelte';
	import type { ClientInformationFormType } from '../ClientInformationForm';
	import ProductForm, { type ProductFormType } from '../ProductForm';

	const { createProduct, editProduct } = APIGateway();
	const {
		back,
		step,
		isSuperAdmin,
		isEdit = false
	} = $props<{
		back: () => void;
		next: () => void;
		step: number;
		isSuperAdmin?: boolean;
		isEdit?: boolean;
	}>();

	const title = $steps[step].title;
	const finishFormButtonLabel: string =
		isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';

	let initialValues = ($steps[step].formData as ProductFormType) || {
		[Environment.STAGING]: ClientLaunchValuesWalletIntegration,
		[Environment.PRODUCTION]: ClientLaunchValuesWalletIntegration
	};

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
		if (values[Environment.STAGING].id && values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		if (response.some((res) => res.error)) {
			error = ErrorMessages.CreateProductFailed;
			isLoading = false;
			return;
		}

		setTimeout(() => {
			goto('/');
		}, 3000);

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
	};

	const handleCreateProduct = async (values: ProductFormType) => {
		const clientFormData = $steps[Step.ClientInformation].formData;
		const stagingProduct = createProduct(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.ClientLaunch,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 0,
				...values[Environment.STAGING]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const productionProduct = createProduct(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.ClientLaunch,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 1,
				...values[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);
		if (response.some((res) => res.message === 'Success' && res.statusCode === 100)) {
			message = `${Product[$selectedIntegration]} has been successfully created`;
		}
		return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const stagingProduct = editProduct(
			{
				...values[Environment.STAGING],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);
		const productionProduct = editProduct(
			{
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);
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
	<ProductForm {finishFormButtonLabel} {title} {initialValues} {back} {isLoading} {disabled} onSubmit={handleSubmit} />
</div>

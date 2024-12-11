
<script lang="ts">
	import { goto } from '$app/navigation';
  	import { type EditProductPayload } from '$api/request.DTO.model';
	import { ClientLaunchValues } from '$constants/productFormValues';
	import Environment from "$enums/Environment";
	import ProductForm, { type ProductFormType } from "./ProductForm";
    import steps from '$stores/steps';
    import auth from '$stores/auth';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from './Alert.svelte';
	import Step from '$enums/Step';
	import APIGateway from '$api/APIGateway';
	import type { ClientInformationFormType } from './ClientInformationForm';
	import { servicesTypeId } from '$constants/services';
	import selectedIntegration from '$stores/integration';

    const { createProduct, editProduct } = APIGateway();
	const { back, step } = $props<{
		back: () => void;
		next: () => void;
		step: number;
	}>();

	const title = $steps[step].title;

	let initialValues = $steps[step].formData as ProductFormType || {
		[Environment.STAGING]: ClientLaunchValues,
		[Environment.PRODUCTION]: ClientLaunchValues
	};

    let error = $state('');
	let isLoading = $state(false);

	const handleSubmit = async (values: ProductFormType) => {
		isLoading = true;

		let response;
		if (values[Environment.STAGING].id && values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		isLoading = false;

		if (response.some((res) => res.error)) {
			error = ErrorMessages.CreateProductFailed;
			return;
		}

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
		if(response.some((res) => res.message === "Success" && res.statusCode === 100)){
			setTimeout(() => {
				goto("/");
			}, 3000);
		}
		return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const stagingProduct = editProduct({
			...values[Environment.STAGING],
			stepName: '',
		} as EditProductPayload, {
			'x-user-token': $auth?.userToken as string
		});
		const productionProduct = editProduct({
			...values[Environment.PRODUCTION],
			stepName: '',
		} as EditProductPayload,{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);

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

<ProductForm {step} {title} {initialValues} {back} {isLoading} onSubmit={handleSubmit}/>
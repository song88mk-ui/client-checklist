<script lang="ts">
	import { backOfficeValues } from '$constants/productFormValues';
	import auth from '$stores/auth';
	import Environment from '$enums/Environment';
	import ProductForm, { type ProductFormType } from './ProductForm';
	import selectedIntegration from '$stores/integration';
	import APIGateway from '$api/APIGateway';
	import Services from '$enums/Services';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from './Alert.svelte';
	import Step from '$enums/Step';
	import steps from '$stores/steps';
	import { servicesTypeId } from '$constants/services';

	const { createProduct } = APIGateway();

	const { back, next, step } = $props<{
		back: () => void
		next: () => void
        step: number
	}>();

	const title = $steps[step].title;

	const initialValues = {
		[Environment.PRODUCTION]: backOfficeValues,
		[Environment.STAGING]: backOfficeValues
	};

	let error = $state('');
	let isLoading = $state(false);

	const handleSubmit = async (values: ProductFormType) => {
		isLoading = true;
		const [clientId] = $steps[Step.ClientInformation].ids;
		const stagingProduct = createProduct(
			{
				clientId,
				stepId: Step.BackOffice,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				sortOrder: 0,
				environment: 0,
				...values[Environment.STAGING]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const productionProduct = createProduct(
			{
				clientId,
				stepId: Step.BackOffice,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				sortOrder: 0,
				environment: 1,
				...values[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);
		
		const response = await Promise.all([stagingProduct, productionProduct]);
		isLoading = false;
		
		if (response.some((res) => res.error)) {
			error = ErrorMessages.CreateProductFailed;
			return;
		}

		console.log(response);

		next();
	};

	$effect(() => {
		if (error) {
			setTimeout(() => {
				error = '';
			}, 5000);
		}
	})
</script>

{#if error}
	<div class="mb-5">
		<Alert variant="error" message={error} hasCloseButton={false} />
	</div>
{/if}

<ProductForm {title} {initialValues} {back} {isLoading} onSubmit={handleSubmit} />

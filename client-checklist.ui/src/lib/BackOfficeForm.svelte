<script lang="ts">
	import { backOfficeValues } from '$constants/productFormValues';
	import auth from '$stores/auth';
	import Environment from '$enums/Environment';
	import Steps from '$enums/Step';
	import ProductForm, { type ProductFormType } from './ProductForm';
	import selectedIntegration from '$stores/integration';
	import { INTEGRATION_STEPS } from './ProgressStep/const';
	import APIGateway from '$api/APIGateway';
	import Services from '$enums/Services';
	import { selectedClientId } from '$stores/client';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from './Alert.svelte';

	const { createProduct } = APIGateway();

	const { back, next } = $props<{
		back: () => void;
		next: () => void;
	}>();

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[Steps.BackOffice].title;

	const initialValues = {
		[Environment.PRODUCTION]: backOfficeValues,
		[Environment.STAGING]: backOfficeValues
	};

	let error = $state('');
	let isLoading = $state(false);

	const handleSubmit = async (values: ProductFormType) => {
		isLoading = true;
		const stagingProduct = createProduct(
			{
				clientId: $selectedClientId,
				stepId: Steps.BackOffice,
				stepName: '',
				serviceTypeId: Services.LIVE_DATA_INTEGRATION,
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
				clientId: $selectedClientId,
				stepId: Steps.BackOffice,
				stepName: '',
				serviceTypeId: Services.LIVE_DATA_INTEGRATION,
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

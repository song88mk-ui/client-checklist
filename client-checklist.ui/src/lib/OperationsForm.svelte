
<script lang="ts">
    import { operationsValues } from '$constants/productFormValues';
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
	import { INTEGRATION_STEPS } from "./ProgressStep/const";
    import APIGateway from '$api/APIGateway';
	import { selectedClientId } from '$stores/client';
    import auth from '$stores/auth';
	import Step from '$enums/Step';
	import Services from '$enums/Services';
	import { ErrorMessages } from '$enums/ErrorMessages';

    const { createProduct } = APIGateway();

    const { step, next, back } = $props()

	let error = $state('');
	let isLoading = $state(false);

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[step].title;

    const initialValues = {
        [Environment.STAGING]: operationsValues,
        [Environment.PRODUCTION]: operationsValues
    }

    const handleSubmit = async(values: ProductFormType) => {
		isLoading = true;
		const stagingProduct = createProduct(
			{
				clientId: $selectedClientId as string,
				stepId: Step.Operations,
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
				clientId: $selectedClientId as string,
				stepId: Step.Operations,
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
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit}/>
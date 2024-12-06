
<script lang="ts">
    import { ClientLaunchValues } from '$constants/productFormValues';
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
	import { INTEGRATION_STEPS } from "./ProgressStep/const";
    import APIGateway from '$api/APIGateway';
    import auth from '$stores/auth';
		import Step from '$enums/Step';
		import steps from '$stores/steps';
	import Services from '$enums/Services';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import type { ClientInformationFormType } from './ClientInformationForm';

    const { createProduct } = APIGateway();

    const { step, next, back } = $props()

	let error = $state('');
	let isLoading = $state(false);

	const title = $steps[step].title;

    const initialValues = {
        [Environment.STAGING]: ClientLaunchValues,
        [Environment.PRODUCTION]: ClientLaunchValues
    }

    const handleSubmit = async(values: ProductFormType) => {
		isLoading = true;
		const clientFormData = $steps[Step.ClientInformation].formData;
		const stagingProduct = createProduct(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.ClientLaunch,
				stepName: '',
				serviceTypeId: Services.SPORTBOOK_AND_WALLET_INTEGRATION,
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
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.ClientLaunch,
				stepName: '',
				serviceTypeId: Services.SPORTBOOK_AND_WALLET_INTEGRATION,
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

<script lang="ts">
    import { operationsValues } from '$constants/productFormValues';
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
    import APIGateway from '$api/APIGateway';
		import steps from '$stores/steps';
    import auth from '$stores/auth';
		import Step from '$enums/Step';
		import type { ClientInformationFormType } from './ClientInformationForm';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import { servicesTypeId } from '$constants/services';

    const { createProduct } = APIGateway();

    const { step, next, back } = $props()

	let error = $state('');
	let isLoading = $state(false);

	const title = $steps[step].title;

    const initialValues = {
        [Environment.STAGING]: operationsValues,
        [Environment.PRODUCTION]: operationsValues
    }

    const handleSubmit = async(values: ProductFormType) => {
		isLoading = true;
		const clientFormData = $steps[Step.ClientInformation].formData;
		const stagingProduct = createProduct(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.Operations,
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
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.Operations,
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

		next();    
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit}/>
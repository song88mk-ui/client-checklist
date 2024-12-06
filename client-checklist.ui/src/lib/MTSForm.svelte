
<script lang="ts">
    import { MTSValues } from '$constants/productFormValues';
    import APIGateway from '$api/APIGateway';
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
    import auth from '$stores/auth';
		import Step from '$enums/Step';
		import steps from '$stores/steps';
		import type { ClientInformationFormType } from './ClientInformationForm';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import { servicesTypeId } from '$constants/services';

    const initialValues = {
        [Environment.STAGING]: MTSValues,
        [Environment.PRODUCTION]: MTSValues
    }

    const { step, next, back } = $props()

	const title = $steps[step].title;

    let error = $state('');
	let isLoading = $state(false);

    const { createProduct } = APIGateway();



    const handleSubmit = async (values: ProductFormType) => {
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
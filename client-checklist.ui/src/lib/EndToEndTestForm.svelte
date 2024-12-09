<script lang="ts">
    import APIGateway from "$api/APIGateway";
    import { endToEndTestValues } from '$constants/productFormValues';
    import { servicesTypeId } from "$constants/services";
    import Environment from "$enums/Environment";
    import { ErrorMessages } from '$enums/ErrorMessages';
    import Step from '$enums/Step';
		import steps from '$stores/steps';
		import type { ClientInformationFormType } from './ClientInformationForm';
    import auth from '$stores/auth';
    import selectedIntegration from '$stores/integration';
    import ProductForm, { type ProductFormType } from "./ProductForm";
    
    const { step, next, back } = $props()

    const { createProduct } = APIGateway();

	const title = $steps[step].title;
    
    const initialValues: ProductFormType = {
        [Environment.STAGING]: endToEndTestValues,
        [Environment.PRODUCTION]: endToEndTestValues
    }

    let error = $state('');
	let isLoading = $state(false);

    const handleSubmit = async (values: ProductFormType) => {
        isLoading = true;
				const clientFormData = $steps[Step.ClientInformation].formData;
		const stagingProduct = createProduct(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: Step.EndToEndFunctionalPerformanceTest,
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
				stepId: Step.EndToEndFunctionalPerformanceTest,
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

        next()
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit} />

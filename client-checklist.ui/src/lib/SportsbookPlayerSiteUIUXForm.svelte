<script lang="ts">
    import APIGateway from "$api/APIGateway";
    import { sportsbookPlayerSiteValues } from '$constants/productFormValues';
    import { servicesTypeId } from "$constants/services";
    import Environment from "$enums/Environment";
    import { ErrorMessages } from '$enums/ErrorMessages';
    import Step from "$enums/Step";
    import auth from '$stores/auth';
    import { selectedClientId } from "$stores/client";
    import selectedIntegration from '$stores/integration';
    import ProductForm, { type ProductFormType } from "./ProductForm";
    import { INTEGRATION_STEPS } from "./ProgressStep/const";
    
    const { step, next, back } = $props()

    const { createProduct } = APIGateway();

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[step].title;

    const initialValues = {
        [Environment.STAGING]: sportsbookPlayerSiteValues,
        [Environment.PRODUCTION]: sportsbookPlayerSiteValues
    }

    let error = $state('');
	let isLoading = $state(false);

    const handleSubmit = async (values: ProductFormType) => {
        isLoading = true;
		const stagingProduct = createProduct(
			{
				clientId: $selectedClientId as string,
				stepId: Step.SportsbookPlayerSite,
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
				clientId: $selectedClientId as string,
				stepId: Step.SportsbookPlayerSite,
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

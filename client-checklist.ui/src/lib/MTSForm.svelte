
<script lang="ts">
    import { MTSValues } from '$constants/productFormValues';
	import { ClientRowStatus } from "$enums/ClientRowStatus";
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
	import { INTEGRATION_STEPS } from "./ProgressStep/const";
    
    const { step, next, back } = $props()

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[step].title;

    const initialValues = {
        [Environment.STAGING]: MTSValues,
        [Environment.PRODUCTION]: MTSValues
    }

    const handleSubmit = (values: ProductFormType) => {
        next()
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit}/>
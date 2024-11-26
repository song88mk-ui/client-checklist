<script lang="ts">
	import { backOfficeValues } from '$constants/productFormValues';
	import Environment from '$enums/Environment';
	import Steps from '$enums/Step';
	import ProductForm, { type ProductFormType } from './ProductForm';
	import selectedIntegration from '$stores/integration';
	import { INTEGRATION_STEPS } from './ProgressStep/const';

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

	const handleSubmit = (values: ProductFormType) => {
		// API call here
		next();
	};
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit} />

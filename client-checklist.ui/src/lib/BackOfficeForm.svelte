<script lang="ts">
	import { backOfficeValues } from '$constants/productFormValues';
	import Environment from '$enums/Environment';
	import ProductForm, { type ProductFormType } from './ProductForm';

	let { environment = $bindable() } = $props<{
		environment: Environment;
	}>();

	const initialValues: { [key: Environment]: ProductFormType } = {
		[Environment.PRODUCTION]: backOfficeValues,
		[Environment.STAGING]: backOfficeValues
	};

	const handleSubmit = (values: ProductFormType) => {
		console.log(values);
	};
</script>

<ProductForm initialValues={initialValues[Environment.PRODUCTION]} onSubmit={handleSubmit} />

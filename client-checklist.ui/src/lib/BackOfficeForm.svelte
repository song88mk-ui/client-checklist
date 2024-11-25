<script lang="ts">
	import { backOfficeValues } from '$constants/productFormValues';
	import Environment from '$enums/Environment';
	import ProductForm, { type ProductFormType } from './ProductForm';
	import environment from '$stores/environment';

	let prevEnvironment: Environment;
	let hasMounted = false;
	let hasChangedEnv = false;

	let { back, next } = $props<{
		back: () => void;
		next: () => void;
	}>();

	let environmentValues = {
		[Environment.PRODUCTION]: backOfficeValues,
		[Environment.STAGING]: backOfficeValues
	};

	let initialValues = $state(backOfficeValues);

	let formEl: HTMLFormElement | undefined = $state();

	$effect(() => {
		if (!hasMounted) {
			hasMounted = true;
			prevEnvironment = $environment;
			return;
		}
		if (prevEnvironment !== $environment) {
			hasChangedEnv = true;
			formEl?.requestSubmit();
		}
	});

	const handleSubmit = (values: ProductFormType) => {
		environmentValues[prevEnvironment] = $state.snapshot(values);

		if (hasChangedEnv) {
			hasChangedEnv = false;
			initialValues = environmentValues[$environment];
			prevEnvironment = $environment;
			return;
		}

		// API call
		next();
	};

	const handleError = () => {
		$environment = prevEnvironment;
	};
</script>

<ProductForm bind:formEl {initialValues} {back} onSubmit={handleSubmit} onError={handleError} />

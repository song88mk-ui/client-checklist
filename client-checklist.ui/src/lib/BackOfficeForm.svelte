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

	let productionValues = backOfficeValues;
	let stagingValues = backOfficeValues;

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
		if (prevEnvironment === Environment.PRODUCTION) {
			productionValues = values;
		} else {
			stagingValues = values;
		}
		// API call
		if (hasChangedEnv) {
			hasChangedEnv = false;
			initialValues = $environment === Environment.PRODUCTION ? productionValues : stagingValues;
			prevEnvironment = $environment;
			return;
		}

		next();
	};

	const handleError = () => {
		$environment = prevEnvironment;
	};
</script>

<ProductForm bind:formEl {initialValues} {back} onSubmit={handleSubmit} onError={handleError} />

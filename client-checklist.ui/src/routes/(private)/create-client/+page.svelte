<script lang="ts">
	import ProductForm, { type ProductFormType } from '$lib/ProductForm';
	import ClientInformationForm from '$lib/ClientInformationForm.svelte';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import { backOfficeValues } from '$constants/productFormValues';
	import selectedIntegration from '$stores/integration';
	import Product from '$utils/client';
	import { Environment } from '$enums/Environment';
	import EnvironmentButtonGroup from '$lib/EnvironmentButtonGroup.svelte';

	let environment = $state(Environment.STAGING);
	let step = $state(0);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	const handleSubmit = (values: ProductFormType) => {
		next();
	};

	const handleStepBack = () => {
		back();
	};
</script>

<div class="mb-10 flex items-center justify-between">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
	<EnvironmentButtonGroup bind:environment />
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step />
</div>
<div class="mb-10">
	{#if step === 0}
		<ClientInformationForm />
	{:else if step === 1}
		<ProductForm
			initialValues={backOfficeValues}
			onSubmit={handleSubmit}
			onStepBack={handleStepBack}
		/>
	{/if}
</div>

<script lang="ts">
	import ClientInformationForm from '$lib/ClientInformationForm.svelte';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import selectedIntegration from '$stores/integration';
	import Product from '$utils/client';
	import EnvironmentButtonGroup from '$lib/EnvironmentButtonGroup.svelte';
	import BackOfficeForm from '$lib/BackOfficeForm.svelte';
	let step = $state(0);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};
</script>

<div class="mb-10 flex items-center justify-between">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
	{#if step !== 0}
		<EnvironmentButtonGroup />
	{/if}
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step />
</div>
<div class="mb-10">
	{#if step === 0}
		<ClientInformationForm {back} {next} />
	{:else if step === 1}
		<BackOfficeForm {back} {next} />
	{/if}
</div>

<script lang="ts">
	import ClientInformationForm from '$lib/ClientInformationForm.svelte';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import selectedIntegration from '$stores/integration';
	import Product from '$utils/client';
	import BackOfficeForm from '$lib/BackOfficeForm.svelte';
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import WalletIntegrationForm from '$lib/WalletIntegrationForm.svelte';
	import MTSForm from '$lib/MTSForm.svelte';

	let step = $state(0);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	$inspect(step)
    
	const steps = INTEGRATION_STEPS[$selectedIntegration];
</script>

<div class="mb-10">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step />
</div>
<div class="mb-10">
	{#if step === 0}
		<ClientInformationForm {back} {next} />
	{:else if step === 1}
		<BackOfficeForm {back} {next} {step}/>
	{:else if step === 2 }
		<WalletIntegrationForm {back} {next} {step}/>
	{:else if step === 4 }
		<MTSForm {back} {next} {step}/>
	{/if}
</div>

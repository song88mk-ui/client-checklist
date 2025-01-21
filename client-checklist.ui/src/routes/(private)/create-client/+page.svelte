<script lang="ts">
	import BackOfficeForm from '$lib/StepsForm/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/StepsForm/BusinessAcceptanceForm.svelte';
	import ClientInformationForm from '$lib/ClientInformationForm';
	import ClientLaunchFeedIntegration from '$lib/StepsForm/ClientLaunchFeedIntegration.svelte';
	import EndToEndTestForm from '$lib/StepsForm/EndToEndTestForm.svelte';
	import MTSForm from '$lib/StepsForm/MTSForm.svelte';
	import OperationsForm from '$lib/StepsForm/OperationsForm.svelte';
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import SportsbookPlayerSiteUiuxForm from '$lib/StepsForm/SportsbookPlayerSiteUIUXForm.svelte';
	import WalletIntegrationForm from '$lib/StepsForm/WalletIntegrationForm.svelte';
	import OddsFeedIntegrationForm from '$lib/StepsForm/OddsFeedIntegrationForm.svelte';
	import selectedIntegration from '$stores/integration';
	import Product from '$utils/client';
	import steps from '$stores/steps';
	import IntegrationType from "$enums/integrationType";
	import ClientLaunchWalletIntegration from '$lib/StepsForm/ClientLaunchWalletIntegration.svelte';

	let step = $state(0);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	$effect(() => {
		$steps = INTEGRATION_STEPS[$selectedIntegration];
	})


</script>

<div class="mb-10">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step />
</div>
<div class="mb-10">

	{#if $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		{#if step === 0}
			<ClientInformationForm {next} />
		{:else if step === 1}
			<BackOfficeForm {back} {next} {step}/>
		{:else if step === 2}
			<OddsFeedIntegrationForm {back} {next} {step} />
		{:else if step === 3 }
			<MTSForm {back} {next} {step}/>
		{:else if step === 4}
			<ClientLaunchFeedIntegration {back} {next} {step}/>
		{:else if step === 5}
			<OperationsForm {back} {next} {step}/>
		{:else if step === 6}
			<ClientLaunchFeedIntegration {back} {next} {step}/>
		{:else if step === 7}
			<ClientLaunchFeedIntegration {back} {next} {step}/>
		{/if}
	{/if}

	{#if $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		{#if step === 0}
			<ClientInformationForm {next} />
		{:else if step === 1}
			<BackOfficeForm {back} {next} {step}/>
		{:else if step === 2}
			<WalletIntegrationForm {back} {next} {step}/>
		{:else if step === 3 }
			<SportsbookPlayerSiteUiuxForm {back} {next} {step} />
		{:else if step === 4}
			<MTSForm {back} {next} {step}/>
		{:else if step === 5 }
			<EndToEndTestForm {back} {next} {step}/>
		{:else if step === 6 }
			<OperationsForm {back} {next} {step}/>
		{:else if step === 7}
			<BusinessAcceptanceForm {back} {next} {step}/>
		{:else if step === 8}
			<ClientLaunchWalletIntegration {back} {next} {step}/>
		{/if}
	{/if}
</div>

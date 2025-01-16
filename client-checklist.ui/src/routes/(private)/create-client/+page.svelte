<script lang="ts">
	import BackOfficeForm from '$lib/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/BusinessAcceptanceForm.svelte';
	import ClientInformationForm from '$lib/ClientInformationForm';
	import ClientLaunchForm from '$lib/ClientLaunch.svelte';
	import ClientLaunchFeedIntegration from '$lib/ClientLaunchFeedIntegration.svelte';
	import EndToEndTestForm from '$lib/EndToEndTestForm.svelte';
	import MTSForm from '$lib/MTSForm.svelte';
	import OperationsForm from '$lib/OperationsForm.svelte';
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import SportsbookPlayerSiteUiuxForm from '$lib/SportsbookPlayerSiteUIUXForm.svelte';
	import WalletIntegrationForm from '$lib/WalletIntegrationForm.svelte';
	import OddsFeedIntegrationForm from '$lib/OddsFeedIntegrationForm.svelte';
	import selectedIntegration from '$stores/integration';
	import Product from '$utils/client';
	import steps from '$stores/steps';
	import IntegrationType from "$enums/integrationType";

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
	{#if step === 0}
		<ClientInformationForm {next} />
	{:else if step === 1}
		<BackOfficeForm {back} {next} {step}/>
	{:else if step === 2 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<WalletIntegrationForm {back} {next} {step}/>
	{:else if step === 2 && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<OddsFeedIntegrationForm {back} {next} {step} />
    {:else if step === 3  && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
        <SportsbookPlayerSiteUiuxForm {back} {next} {step} />
	{:else if step === 3  && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<MTSForm {back} {next} {step}/>
	{:else if step === 4 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<MTSForm {back} {next} {step}/>
	{:else if step === 4 && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<ClientLaunchFeedIntegration {back} {next} {step}/>
	{:else if step === 5 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<EndToEndTestForm {back} {next} {step}/>
	{:else if step === 5 && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<OperationsForm {back} {next} {step}/>
	{:else if step === 6 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<OperationsForm {back} {next} {step}/>
	{:else if step === 6 && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<ClientLaunchFeedIntegration {back} {next} {step}/>
	{:else if step === 7 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<BusinessAcceptanceForm {back} {next} {step}/>
	{:else if step === 7 && $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		<ClientLaunchFeedIntegration {back} {next} {step}/>
	{:else if step === 8 && $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		<ClientLaunchFeedIntegration {back} {next} {step}/>
	{/if}
</div>

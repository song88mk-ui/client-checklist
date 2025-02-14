<script lang="ts">
	import auth from '$stores/auth';
	import BackOfficeForm from '$lib/StepsForm/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/StepsForm/BusinessAcceptanceForm.svelte';
	import ClientInformationForm from '$lib/ClientInformationForm';
	import EndToEndTestForm from '$lib/StepsForm/EndToEndTestForm.svelte';
	import MTSForm from '$lib/StepsForm/MTSForm.svelte';
	import OperationsForm from '$lib/StepsForm/OperationsForm.svelte';
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import SportsbookPlayerSiteUiuxForm from '$lib/StepsForm/SportsbookPlayerSiteUIUXForm.svelte';
	import WalletIntegrationForm from '$lib/StepsForm/WalletIntegrationForm.svelte';
	import OddsFeedIntegrationForm from '$lib/StepsForm/OddsFeedIntegrationForm.svelte';
	import selectedIntegration from '$stores/integration';
	import services, { servicesTypeId } from '$constants/services';
	import steps from '$stores/steps';
	import { hasBetValidation } from '$stores/client-launch-feed';
	import IntegrationType from '$enums/integrationType';
	import { AccessType } from '$enums/role';
	import ClientLaunchWalletIntegration from '$lib/StepsForm/ClientLaunchWalletIntegration.svelte';
	import ClientLaunchFeedIntegration from '$lib/StepsForm/ClientLaunchFeedIntegration.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { openModal } from '$stores/modal';
	import ConfirmModal from '$lib/ConfirmModal.svelte';
	import isConfirm from '$stores/confirm-modal';

	// TODO: Reset special cases; Need to refactor
	$hasBetValidation = false;

	let step = $state(0);
	let isSuperAdmin = AccessType.READWRITE === $auth?.accessType;

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
	});

	let url = "";
	beforeNavigate(({ from, to, cancel }) => {
		if (!$isConfirm && from && to && from?.url.pathname !== to?.url.pathname) {
			url = to?.url.pathname || "";
			openModal(ConfirmModal);
			cancel();
		}
		$isConfirm = false;
	});

	$effect(() => {
		if ($isConfirm) {
			goto(url);
		}
	})
</script>

<div class="mb-10">
	<h1 class="text-3xl font-bold">{services[servicesTypeId[$selectedIntegration]]}</h1>
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step />
</div>
<div class="mb-10">

	<!-- refactor to separate component per service type -->
	{#if $selectedIntegration === IntegrationType.FEED_INTEGRATION}
		{#if step === 0}
			<ClientInformationForm {next} />
		{:else if step === 1}
			<BackOfficeForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 2}
			<OddsFeedIntegrationForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 3 }
			<MTSForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 4}
			<OperationsForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 5}
			<EndToEndTestForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 6}
			<BusinessAcceptanceForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 7}
			<ClientLaunchFeedIntegration {isSuperAdmin} {back} {next} {step} />
		{/if}
	{/if}

	{#if $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		{#if step === 0}
			<ClientInformationForm {next} />
		{:else if step === 1}
			<BackOfficeForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 2}
			<WalletIntegrationForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 3 }
			<SportsbookPlayerSiteUiuxForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 4}
			<MTSForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 5 }
			<OperationsForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 6 }
			<EndToEndTestForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 7}
			<BusinessAcceptanceForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 8}
			<ClientLaunchWalletIntegration {isSuperAdmin} {back} {next} {step} />
		{/if}
	{/if}
</div>

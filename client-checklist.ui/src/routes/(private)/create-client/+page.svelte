<script lang="ts">
	import auth from '$stores/auth';
	import BackOfficeForm from '$lib/StepsForm/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/StepsForm/BusinessAcceptanceForm.svelte';
	import ClientInformationForm from '$lib/ClientInformationForm';
	import EndToEndTestForm from '$lib/StepsForm/EndToEndTestForm.svelte';
	import MTSForm from '$lib/StepsForm/MTSForm.svelte';
	import OperationsForm from '$lib/StepsForm/OperationsForm.svelte';
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
	import type Step from '$types/step';
	import StepStatus from '$enums/StepStatus';
	import isErrorValidation from '$stores/validation';

	// TODO: Reset special cases; Need to refactor
	$hasBetValidation = false;
	$isErrorValidation = false;

	let step = $state(0);
	let isSuperAdmin = AccessType.READWRITE === $auth?.accessType;
	let isDoneSubmit = $state(false);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	const WALLET_INTEGRATION_STEPS: Step[] = [
		{ title: 'Contact Information', status: StepStatus.Active, stepId: 0 },
		{ title: 'Back Office', status: StepStatus.Inactive, stepId: 1, isIncomplete: true },
		{ title: 'Wallet Integration', status: StepStatus.Inactive, stepId: 2, isIncomplete: true },
		{ title: 'Sportsbook Player Site UI/UX', status: StepStatus.Inactive, stepId: 3, isIncomplete: true },
		{ title: 'Manage Trading Services', status: StepStatus.Inactive, stepId: 4, isIncomplete: true },
		{ title: 'Operations', status: StepStatus.Inactive, stepId: 5, isIncomplete: true },
		{ title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, stepId: 6, isIncomplete: true },
		{ title: 'Business Acceptance Test', status: StepStatus.Inactive, stepId: 7, isIncomplete: true },
		{ title: 'Client Launch', status: StepStatus.Inactive, stepId: 8 }
	]

	const FEED_INTEGRATION_STEPS: Step[] = [
		{ title: 'Contact Information', status: StepStatus.Active, stepId: 0 },
		{ title: 'Back Office', status: StepStatus.Inactive, stepId: 1, isIncomplete: true },
		{ title: 'Odds Feed Integration', status: StepStatus.Inactive, stepId: 2, isIncomplete: true },
		{ title: 'Manage Trading Services', status: StepStatus.Inactive, stepId: 3, isIncomplete: true },
		{ title: 'Operations', status: StepStatus.Inactive, stepId: 4, isIncomplete: true },
		{ title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, stepId: 5, isIncomplete: true },
		{ title: 'Business Acceptance Test', status: StepStatus.Inactive, stepId: 6, isIncomplete: true },
		{ title: 'Client Launch', status: StepStatus.Inactive, stepId: 7 }
	]

	const INTEGRATION_STEPS = {
		[IntegrationType.WALLET_INTEGRATION]: WALLET_INTEGRATION_STEPS,
		[IntegrationType.FEED_INTEGRATION]: FEED_INTEGRATION_STEPS
	}

	$steps = INTEGRATION_STEPS[$selectedIntegration];

	const onFinishedSubmit = () => {
		isDoneSubmit = true;
	};

	let url = '';
	beforeNavigate(({ from, to, cancel }) => {
		if (!$isConfirm && from && to && from?.url.pathname !== to?.url.pathname && !isDoneSubmit) {
			url = to?.url.pathname || '';
			openModal(ConfirmModal);
			cancel();
		}
		$isConfirm = false;
	});

	$effect(() => {
		if ($isConfirm) {
			goto(url);
		}
	});
</script>

{#if $isErrorValidation && $steps.filter(formStep => formStep.isIncomplete).length > 0}
	<div
		class="mb-8 rounded-md border border-[#FFB97D] bg-[#FEF0C7] p-3 text-xs leading-[1.5] text-[#EF7E1D]"
	>
		<p>
			Some required fields are incomplete. The following sections still need to be completed:
		</p>
		<ul class="ml-5 list-disc font-semibold">
			{#each $steps.filter(formStep => formStep.isIncomplete) as formStep}
				<li>{formStep.title}</li>
			{/each}
		</ul>
	</div>
{/if}
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
		{:else if step === 3}
			<MTSForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 4}
			<OperationsForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 5}
			<EndToEndTestForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 6}
			<BusinessAcceptanceForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 7}
			<ClientLaunchFeedIntegration {isSuperAdmin} {back} {onFinishedSubmit} {step} />
		{/if}
	{/if}

	{#if $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
		{#if step === 0}
			<ClientInformationForm {next} />
		{:else if step === 1}
			<BackOfficeForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 2}
			<WalletIntegrationForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 3}
			<SportsbookPlayerSiteUiuxForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 4}
			<MTSForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 5}
			<OperationsForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 6}
			<EndToEndTestForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 7}
			<BusinessAcceptanceForm {isSuperAdmin} {back} {next} {step} />
		{:else if step === 8}
			<ClientLaunchWalletIntegration {isSuperAdmin} {back} {onFinishedSubmit} {step} />
		{/if}
	{/if}
</div>

<script lang="ts">
	import BackOfficeForm from '$lib/StepsForm/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/StepsForm/BusinessAcceptanceForm.svelte';
	import ClientInformationForm, {
		type ClientInformationFormType
	} from '$lib/ClientInformationForm';
	import EndToEndTestForm from '$lib/StepsForm/EndToEndTestForm.svelte';
	import MTSForm from '$lib/StepsForm/MTSForm.svelte';
	import OperationsForm from '$lib/StepsForm/OperationsForm.svelte';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import SportsbookPlayerSiteUiuxForm from '$lib/StepsForm/SportsbookPlayerSiteUIUXForm.svelte';
	import WalletIntegrationForm from '$lib/StepsForm/WalletIntegrationForm.svelte';
	import OddsFeedIntegrationForm from '$lib/StepsForm/OddsFeedIntegrationForm.svelte';
	import { page } from '$app/stores';
	import APIGateway from '$api/APIGateway';
	import auth from '$stores/auth';
	import { onMount } from 'svelte';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import type { GetClientTaskStatusResponse } from '$api/response.DTO.model';
	import services, { servicesType, servicesTypeId } from '$constants/services';
	import selectedIntegration from '$stores/integration';
	import steps from '$stores/steps';
	import Step from '$enums/Step';
	import groupedByStepId from '$utils/groupedByStepId';
	import type { ProductFormType } from '$lib/ProductForm';
	import { AccessType } from '$enums/role';
	import IntegrationType from '$enums/integrationType';
	import ClientLaunchWalletIntegration from '$lib/StepsForm/ClientLaunchWalletIntegration.svelte';
	import ClientLaunchFeedIntegration from '$lib/StepsForm/ClientLaunchFeedIntegration.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import isConfirm from '$stores/confirm-modal';
	import { openModal } from '$stores/modal';
	import ConfirmModal from '$lib/ConfirmModal.svelte';
    import type {default as StepType} from '$types/step';
	import StepStatus from '$enums/StepStatus';
	import isErrorValidation from '$stores/validation';
	import hasIncompleteSubtask from '$utils/hasIncompleteSubtask';
	import { isFormModified } from '$stores/validation';

	const { getClient } = APIGateway();

	// TODO: Reset special cases; Need to refactor
	$isErrorValidation = false;
	$isFormModified = false;
	
	let step = $state(0);
	let error = $state('');
	let isLoading = $state(true);
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

	const WALLET_INTEGRATION_STEPS: StepType[] = [
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

	const FEED_INTEGRATION_STEPS: StepType[] = [
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

	onMount(async () => {
		const response = await getClient($page.params.clientId, {
			'x-user-token': $auth?.userToken || ''
		});

        let tempSteps: StepType[] = [];

		if (response.error) {
			error = ErrorMessages.FetchClientFailed;
		}

		const { client, clientSteps } = response.data as GetClientTaskStatusResponse;
		if (client) {
			const serviceStep = Step[$selectedIntegration];
			$selectedIntegration = servicesType[client.serviceTypeId];
			tempSteps = INTEGRATION_STEPS[$selectedIntegration];
			tempSteps[serviceStep.ClientInformation].formData = {
				clientId: client.clientId,
				clientName: client.clientName,
				domain: client.domain,
				launchDate: client.targetLaunchDate,
				languages: client.languages.join(),
				currencies: client.currencies.join(),
				sports: client.sports.join(),
				markets: client.markets.join(),
				mainDecisionMakerName: client.mainDecisionMaker.name,
				mainDecisionMakerNumber: client.mainDecisionMaker.number,
				financeManagerName: client.financeManager.name,
				financeManagerNumber: client.financeManager.number,
				productManagerName: client.productManager.name,
				productManagerNumber: client.productManager.number,
				accountManagerName: client.accountManager.name,
				accountManagerNumber: client.accountManager.number,
				technicalManagerName: client.technicalManager.name,
				technicalManagerNumber: client.technicalManager.number,
				customerServiceManagerName: client.customerServiceManager.name,
				customerServiceManagerNumber: client.customerServiceManager.number,
				socialAccount: client.socialAccount,
				taskStatus: client.taskStatus
			} as ClientInformationFormType;
		}
		if (clientSteps.length) {
			const formattedClientSteps = clientSteps.map((step) => ({
				...step,
				clientSubtasks: step.clientSubtasks.map((subtask) => ({
					...subtask,
					taskStatusId: subtask.taskStatus
				}))
			}));

			const stepData = groupedByStepId(formattedClientSteps);
			const serviceStep = Step[$selectedIntegration];
			tempSteps = tempSteps.map((step: StepType) => {
				if (stepData[step.stepId]) {
					const formData = stepData[step.stepId] as ProductFormType;
					const stepValue = {
						...step,
						status: StepStatus.Completed,
						formData,
					}
					if (step.stepId !== serviceStep.ClientLaunch) {
						stepValue.isIncomplete = hasIncompleteSubtask(formData);
					}
					return stepValue;
				}

				return step;
			})
		}

		$steps = tempSteps;

		isLoading = false;
	});

	const onFinishedSubmit = () => {
		isDoneSubmit = true;
	};

	let url = '';
	beforeNavigate(({ from, to, cancel }) => {
		if (!$isConfirm && from && to && from?.url.pathname !== to?.url.pathname && !isDoneSubmit && $isFormModified) {
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

<div class="cc-edit-client-page">
	{#if isLoading}
		<div class="flex h-full items-center justify-center">Loading...</div>
	{/if}

	{#if error}
		<div class="flex h-full items-center justify-center">{error}</div>
	{/if}

	{#if !error && !isLoading}
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
			{#if $selectedIntegration === IntegrationType.FEED_INTEGRATION}
				{#if step === 0}
					<ClientInformationForm isEdit {next} />
				{:else if step === 1}
					<BackOfficeForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 2}
					<OddsFeedIntegrationForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 3}
					<MTSForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 4}
					<OperationsForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 5}
					<EndToEndTestForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 6}
					<BusinessAcceptanceForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 7}
					<ClientLaunchFeedIntegration isEdit {isSuperAdmin} {back} {onFinishedSubmit} {step} />
				{/if}
			{/if}

			{#if $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
				{#if step === 0}
					<ClientInformationForm isEdit {next} />
				{:else if step === 1}
					<BackOfficeForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 2}
					<WalletIntegrationForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 3}
					<SportsbookPlayerSiteUiuxForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 4}
					<MTSForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 5}
					<OperationsForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 6}
					<EndToEndTestForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 7}
					<BusinessAcceptanceForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 8}
					<ClientLaunchWalletIntegration isEdit {isSuperAdmin} {back} {onFinishedSubmit} {step} />
				{/if}
			{/if}
		</div>
	{/if}
</div>

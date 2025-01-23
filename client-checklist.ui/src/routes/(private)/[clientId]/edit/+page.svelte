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
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import steps from '$stores/steps';
	import Step from '$enums/Step';
	import groupedByStepId from '$utils/groupedByStepId';
	import type { ProductFormType } from '$lib/ProductForm';
	import { AccessType } from '$enums/role';
	import IntegrationType from '$enums/integrationType';
	import ClientLaunchWalletIntegration from '$lib/StepsForm/ClientLaunchWalletIntegration.svelte';
	import ClientLaunchFeedIntegration from '$lib/StepsForm/ClientLaunchFeedIntegration.svelte';

	const { getClient } = APIGateway();

	let step = $state(0);
	let error = $state('');
	let isLoading = $state(true);
	let isSuperAdmin = AccessType.READWRITE === $auth?.accessType;

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	const serviceStep = Step[$selectedIntegration];

	onMount(async () => {
		const response = await getClient($page.params.clientId, {
			'x-user-token': $auth?.userToken || ''
		});

		isLoading = false;

		if (response.error) {
			error = ErrorMessages.FetchClientFailed;
		}

		$steps = INTEGRATION_STEPS[$selectedIntegration];

		const { client, clientSteps } = response.data as GetClientTaskStatusResponse;
		if (client) {
			$selectedIntegration = servicesType[client.serviceTypeId];
			$steps = INTEGRATION_STEPS[$selectedIntegration];
			$steps[serviceStep.ClientInformation].formData = {
				clientId: client.clientId,
				clientName: client.clientName,
				domain: client.domain,
				launchDate: client.targetLaunchDate,
				languages: client.languages.join(', '),
				currencies: client.currencies.join(', '),
				sports: client.sports.join(', '),
				markets: client.markets.join(', '),
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
				socialAccount: client.socialAccount
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

			$steps.map((step) => {
				if (stepData[step.stepId]) {
					step.formData = stepData[step.stepId] as ProductFormType;
				}
			});
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
				{:else if step === 3 }
					<MTSForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 4}
					<EndToEndTestForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 5}
					<OperationsForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 6}
					<BusinessAcceptanceForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 7}
					<ClientLaunchFeedIntegration isEdit {isSuperAdmin} {back} {next} {step} />
				{/if}
			{/if}

			{#if $selectedIntegration === IntegrationType.WALLET_INTEGRATION}
				{#if step === 0}
					<ClientInformationForm isEdit {next} />
				{:else if step === 1}
					<BackOfficeForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 2}
					<WalletIntegrationForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 3 }
					<SportsbookPlayerSiteUiuxForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 4}
					<MTSForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 5 }
					<EndToEndTestForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 6 }
					<OperationsForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 7}
					<BusinessAcceptanceForm isEdit {isSuperAdmin} {back} {next} {step} />
				{:else if step === 8}
					<ClientLaunchWalletIntegration isEdit {isSuperAdmin} {back} {next} {step} />
				{/if}
			{/if}
		</div>
	{/if}
</div>

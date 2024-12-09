<script lang="ts">
	import BackOfficeForm from '$lib/BackOfficeForm.svelte';
	import BusinessAcceptanceForm from '$lib/BusinessAcceptanceForm.svelte';
	import ClientInformationForm, {
		type ClientInformationFormType
	} from '$lib/ClientInformationForm';
	import ClientLaunchForm from '$lib/ClientLaunch.svelte';
	import EndToEndTestForm from '$lib/EndToEndTestForm.svelte';
	import MTSForm from '$lib/MTSForm.svelte';
	import OperationsForm from '$lib/OperationsForm.svelte';
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte';
	import SportsbookPlayerSiteUiuxForm from '$lib/SportsbookPlayerSiteUIUXForm.svelte';
	import WalletIntegrationForm from '$lib/WalletIntegrationForm.svelte';
	import Product from '$utils/client';
	import { page } from '$app/stores';
	import APIGateway from '$api/APIGateway';
	import auth from '$stores/auth';
	import { onMount } from 'svelte';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import type { GetClientTaskStatusResponse } from '$api/response.DTO.model';
	import { servicesType } from '$constants/services';
	import selectedIntegration from '$stores/integration';
	import { INTEGRATION_STEPS } from '$lib/ProgressStep/const';
	import steps from '$stores/steps';

	const { getClientTaskStatus } = APIGateway();

	let step = $state(0);
	let error = $state('');
	let isLoading = $state(true);

	const back = () => {
		if (step > 0) {
			step--;
		}
	};

	const next = () => {
		step++;
	};

	onMount(async () => {
		const response = await getClientTaskStatus($page.params.clientId, {
			'x-user-token': $auth?.userToken as string
		});

		isLoading = false;

		if (response.error) {
			error = ErrorMessages.FetchClientFailed;
		}

		const { client, clientSteps } = response.data as GetClientTaskStatusResponse;

		if (client && clientSteps.length) {
			$selectedIntegration = servicesType[clientSteps[0].serviceTypeId];
			$steps = INTEGRATION_STEPS[$selectedIntegration];

			$steps[0].formData = {
				clientId: client.clientId,
				clientName: client.clientName,
				domain: client.domain,
				launchDate: client.targetLaunchDate
			} as ClientInformationFormType;
		}
	});
</script>

{#if isLoading}
	<div class="flex h-full items-center justify-center">Loading...</div>
{/if}

{#if error}
	<div class="flex h-full items-center justify-center">{error}</div>
{/if}

{#if !error && !isLoading}
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
			<BackOfficeForm {back} {next} {step} />
		{:else if step === 2}
			<WalletIntegrationForm {back} {next} {step} />
		{:else if step === 3}
			<SportsbookPlayerSiteUiuxForm {back} {next} {step} />
		{:else if step === 4}
			<MTSForm {back} {next} {step} />
		{:else if step === 5}
			<EndToEndTestForm {back} {next} {step} />
		{:else if step === 6}
			<OperationsForm {back} {next} {step} />
		{:else if step === 7}
			<BusinessAcceptanceForm {back} {next} {step} />
		{:else if step === 8}
			<ClientLaunchForm {back} {next} {step} />
		{/if}
	</div>
{/if}

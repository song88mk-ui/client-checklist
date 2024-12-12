<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { goto } from '$app/navigation';
	import services from '$constants/services';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from '$lib/Alert.svelte';
	import ClientRow from '$lib/ClientRow.svelte';
	import AuthService from '$services/AuthService';
	import auth from '$stores/auth';
	import { clients, deletedClient } from '$stores/client';
	import { onMount } from 'svelte';

	const { fetchClients } = APIGateway();
	const { removeAuth } = AuthService;

	let isLoading = false;
	let error = '';

	onMount(async () => {
		isLoading = true;

		const response = await fetchClients({
			'x-user-token': $auth?.userToken as string
		});

		isLoading = false;

		if (response.error) {
			const { statusCode } = response.error;
			if (statusCode === 401) {
				await removeAuth();
				await goto('/login');
			}

			error = ErrorMessages.FetchClientsFailed;
			return;
		}

		$clients = (response.data as { clients: any[] }).clients.map((client) => ({
			id: client.clientId,
			companyName: client.clientName,
			domain: client.domain,
			targetLaunchDate: client.targetLaunchDate,
			services: services[client.serviceTypeId],
			mainDecisionMaker: client.mainDecisionMaker.name,
			status: client.taskStatus,
			clientToken: client.clientToken,
            isActive: client.isActive
		}));
	});

	let headerCss = 'pl-3 font-[600] text-[13px] text-[#000] leading-[16.34px]';

	$: if ($deletedClient) {
		setTimeout(() => {
			$deletedClient = null;
		}, 5000);
	}
</script>

{#if isLoading}
	<div class="flex h-full items-center justify-center">Loading...</div>
{/if}

{#if error}
	<div class="flex h-full items-center justify-center">{error}</div>
{/if}

{#if !isLoading && !error}
	{#if $deletedClient}
		<Alert
			variant="success"
			message={`The account ${$deletedClient.companyName} has been successfully deleted.`}
			hasCloseButton={false}
		/>
	{/if}
	<div class="mb-[15px] mt-[15px] flex w-full flex-row items-center">
		<span class={`${headerCss} w-[10%]`}>Company</span>
		<span class={`${headerCss} w-[10%]`}>Domain</span>
		<span class={`${headerCss} w-[10%]`}>Target Launch Date</span>
		<span class={`${headerCss} w-[30%]`}>Services</span>
		<span class={`${headerCss} w-[10%]`}>Main Decision Maker</span>
		<span class={`${headerCss} w-[10%]`}>Status</span>
		<span class={`${headerCss} w-[10%] text-center`}>Actions</span>
        <span class={`${headerCss} w-[10%] text-center`}>Enable/Disable</span>
	</div>
	{#each $clients as client}
		<ClientRow {client} />
	{/each}
{/if}

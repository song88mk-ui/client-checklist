<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from '$lib/Alert.svelte';
	import ClientRow from '$lib/ClientRow.svelte';
	import auth from '$stores/auth';
	import { clients, deletedClient } from '$stores/client';
	import type { Client } from '$types/client';
	import { onMount } from 'svelte';
	import ClientListHeader from '$lib/ClientListHeader.svelte';
	import type { ClientDto, GetClientsResponseDto } from '$api/GetClients.DTO';
	import { toClientViewModel } from '$mapper/ClientMapper';
	import { PageGuard } from '$services/PageGuard';

	let isLoading = false;
	let error = '';

	onMount(async () => {
		isLoading = true;

		const response = await APIGateway().fetchClients({
			'x-user-token': $auth?.userToken as string
		});

		isLoading = false;

		if (response.error) {
			await PageGuard(response.error.statusCode)

			error = ErrorMessages.FetchClientsFailed;
			return;
		}

		$clients = (response.data as GetClientsResponseDto)
			.clients
			.map((client: ClientDto) => (toClientViewModel(client)))
			.sort((a: Client, b: Client) => a.companyName.localeCompare(b.companyName));
	});

	$: if ($deletedClient) {
		setTimeout(() => {
			$deletedClient = null;
		}, 5000);
	}
</script>

<div class="cc-dashboard-page">
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
		<ClientListHeader />
		{#each $clients as client}
			<ClientRow {client} />
		{/each}
	{/if}
</div>

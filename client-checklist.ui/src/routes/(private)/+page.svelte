<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { goto } from '$app/navigation';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from '$lib/Alert.svelte';
	import ClientRow from '$lib/ClientRow.svelte';
	import AuthService from '$services/AuthService';
	import auth from '$stores/auth';
	import { clients, deletedClient } from '$stores/client';
	import { onMount } from 'svelte';
	import ClientListHeader from '$lib/ClientListHeader.svelte';
	import type { ClientDto, GetClientsResponseDto } from '$api/GetClients.DTO';
	import { toClientViewModel } from '$mapper/ClientMapper';

	const { removeAuth } = AuthService;

	let isLoading = false;
	let error = '';

	onMount(async () => {
		isLoading = true;

		const response = await APIGateway().fetchClients({
			'x-user-token': $auth?.userToken as string
		});

		isLoading = false;

		if (response.error) {
			const { statusCode } = response.error;
			if (statusCode === 401) {
				removeAuth();
				await goto('/login');
			}

			error = ErrorMessages.FetchClientsFailed;
			return;
		}

		$clients = (response.data as GetClientsResponseDto)
				.clients
				.map((client: ClientDto) => (toClientViewModel(client)));
	});

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
	<ClientListHeader></ClientListHeader>
	{#each $clients as client}
		<ClientRow {client} />
	{/each}
{/if}

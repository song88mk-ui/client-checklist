<script lang="ts">
	import ClientRow from '$lib/ClientRow.svelte';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import auth from '$stores/auth';
	import { AccessType } from '$enums/role';
	import { onMount } from 'svelte';
	import APIGateway from '$api/APIGateway';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import services from '$constants/services';

	const { fetchClients } = APIGateway();

	let isLoading = false;
	let error = '';
	let clients: Array<{
		id: string;
		companyName: string;
		domain: string;
		targetLaunchDate: string;
		services: string;
		mainDecisionMaker: string;
		status: ClientRowStatus;
	}> = [];

	onMount(async () => {
		isLoading = true;

		const response = await fetchClients({
			'x-user-token': $auth?.userToken as string,
		});

		isLoading = false;
		
		if (response.error) {
			error = ErrorMessages.FetchClientsFailed;
			return;
		}

		clients = (response.data as { clients: any[] }).clients.map(client => ({
			id: client.id,
			companyName: client.clientName,
			domain: client.domain,
			targetLaunchDate: client.targetLaunchDate,
			services: services[client.serviceTypeId],
			mainDecisionMaker: client.mainDecisionMaker.name,
			status: client.taskStatus,
		}));
	});

	let headerCss = 'pl-3 font-[600] text-[13px] text-[#000] leading-[16.34px]';
</script>

{#if isLoading}
	<div class="h-full flex items-center justify-center">Loading...</div>
{/if}

{#if error}
	<div class="h-full flex items-center justify-center">{error}</div>
{/if}

{#if !isLoading && !error}
	<div class="mb-[15px] mt-[15px] flex w-full flex-row items-center">
		<span class={`${headerCss} w-[15%]`}>Company</span>
		<span class={`${headerCss} w-[15%]`}>Domain</span>
		<span class={`${headerCss} w-[10%]`}>Target Launch Date</span>
		{#if $auth?.accessType == AccessType.READWRITE}
			<span class={`${headerCss} w-[30%]`}>Services</span>
		{:else}
			<span class={`${headerCss} w-[40%]`}>Services</span>
		{/if}
		<span class={`${headerCss} w-[10%]`}>Main Decision Maker</span>
		<span class={`${headerCss} w-[10%]`}>Status</span>
		{#if $auth?.accessType == AccessType.READWRITE}
			<span class={`${headerCss} w-[10%] text-center`}>Actions</span>
		{/if}
	</div>
	{#each clients as client}
		<ClientRow {client} />
	{/each}
{/if}


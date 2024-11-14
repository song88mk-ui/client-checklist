<script lang="ts">
	import { openModal } from '$stores/modal';
	import auth from '$stores/auth';
	import ClientRowStatus from './ClientRowStatus.svelte';
	import DeleteClientModal from './DeleteClientModal.svelte';
	import GenerateLinkModal from './GenerateLinkModal.svelte';
	import { AccessType } from '$enums/role';
	import { format } from 'date-fns';
	import { selectedClient } from '$stores/client';

	export let client: any = {};

	let textCss = 'pl-3 py-5 font-[400] text-[13px] text-[#202020] leading-[16.34px]';

	const handleShowDeleteModal = () => {
		$selectedClient = client;
		openModal(DeleteClientModal);
	};

	const handleShowGenerateLinkModal = () => {
		$selectedClient = client;
		openModal(GenerateLinkModal);
	};
</script>

<div
	class="mb-[12px] flex w-full flex-row items-center rounded-[5px] border-[1px] border-solid border-[#D6D6D6] bg-[#FFF]"
>
	<span class={`${textCss} w-[15%] capitalize`}>{client.companyName}</span>
	<span class={`${textCss} w-[15%] capitalize`}>{client.domain}</span>
	<span class={`${textCss} w-[10%]`}
		>{format(new Date(client.targetLaunchDate), 'MMMM dd, yyyy')}</span
	>
	{#if $auth?.accessType == AccessType.READWRITE}
		<span class={`${textCss} w-[30%]`}>{client.services}</span>
	{:else}
		<span class={`${textCss} w-[40%]`}>{client.services}</span>
	{/if}
	<span class={`${textCss} w-[10%] capitalize`}>{client.mainDecisionMaker}</span>

	<span class={`${textCss} w-[10%]`}>
		<ClientRowStatus status={client.status} />
	</span>
	{#if $auth?.accessType == AccessType.READWRITE}
		<div class="flex w-[10%] cursor-pointer flex-row items-center justify-center py-5 pl-3">
			<button class="cursor-pointer p-2">
				<img alt="icon-edit" src="/icon-edit.svg" />
			</button>
			<button on:click={handleShowDeleteModal} class="cursor-pointer p-2">
				<img alt="icon-delete" src="/icon-delete.svg" />
			</button>
			<button on:click={handleShowGenerateLinkModal} class="cursor-pointer p-2">
				<img alt="icon-link" src="/icon-link.svg" />
			</button>
		</div>
	{/if}
</div>

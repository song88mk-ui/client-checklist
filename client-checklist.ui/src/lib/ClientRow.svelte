<script lang="ts">
	import { AccessType } from '$enums/role';
	import auth from '$stores/auth';
	import { selectedClient } from '$stores/client';
	import { openModal } from '$stores/modal';
	import { format } from 'date-fns';
	import ClientRowStatus from './ClientRowStatus.svelte';
	import ClientStatusModal from './ClientStatusModal.svelte';
	import GenerateLinkModal from './GenerateLinkModal.svelte';

	export let client: any = {};

	let isSuperAdmin: boolean = $auth?.accessType == AccessType.READWRITE;
	let textCss = 'pl-3 py-5 font-[400] text-[13px] text-[#202020] leading-[16.34px]';

	const handleShowGenerateLinkModal = () => {
		$selectedClient = client;
		openModal(GenerateLinkModal);
	};

	const handleShowEnableDisableModal = (e: any) => {
		e.preventDefault();
        
        if (!isSuperAdmin) return;

		$selectedClient = client;
		openModal(ClientStatusModal);
	};
</script>

<div
	class="mb-[12px] flex w-full flex-row items-center rounded-[5px] border-[1px] border-solid border-[#D6D6D6] bg-[#FFF]"
>
	<span class={`${textCss} w-[10%] capitalize`}>{client.companyName}</span>
	<span class={`${textCss} w-[10%] capitalize`}>{client.domain}</span>
	<span class={`${textCss} w-[10%]`}
		>{format(new Date(client.targetLaunchDate), 'MMMM dd, yyyy')}</span
	>
	<span class={`${textCss} w-[30%]`}>{client.services}</span>
	<span class={`${textCss} w-[10%] capitalize`}>{client.mainDecisionMaker}</span>

	<span class={`${textCss} w-[10%]`}>
		<ClientRowStatus status={client.status} />
	</span>
	<div class="flex w-[10%] cursor-pointer flex-row items-center justify-center py-5 pl-3">
		<a href={`/${client.id}/edit`} class="cursor-pointer p-2">
			{#if isSuperAdmin}
				<img alt="icon-edit" src="/icon-edit.svg" />
			{:else}
				<img alt="icon-view" src="/icon-view.svg" />
			{/if}
		</a>
		<button on:click={handleShowGenerateLinkModal} class="cursor-pointer p-2">
			<img alt="icon-link" src="/icon-link.svg" />
		</button>
	</div>
	<div
		role="presentation"
		class="flex w-[10%] items-center justify-center pl-3"
		on:click={(e: any) => handleShowEnableDisableModal(e)}
	>
		<label class="inline-flex cursor-pointer items-center">
			<input type="checkbox" class="peer sr-only" bind:checked={client.isActive} />
			<div
				class={`peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] ${isSuperAdmin ? "peer-checked:bg-[#18F2A8]" : "peer-checked:bg-[#E5E7EB]"} peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700`}
			></div>
		</label>
	</div>
</div>

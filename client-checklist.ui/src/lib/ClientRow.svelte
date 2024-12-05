<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import type { SetClientActiveStatusFormDataType } from '$api/request.DTOs.model';
	import { AccessType } from '$enums/role';
	import auth from '$stores/auth';
	import { selectedClient } from '$stores/client';
	import { openModal } from '$stores/modal';
	import { format } from 'date-fns';
	import ClientRowStatus from './ClientRowStatus.svelte';
	import GenerateLinkModal from './GenerateLinkModal.svelte';

	export let client: any = {};

	const { setClientActiveStatus } = APIGateway();

	let textCss = 'pl-3 py-5 font-[400] text-[13px] text-[#202020] leading-[16.34px]';

	const handleShowGenerateLinkModal = () => {
		$selectedClient = client;
		openModal(GenerateLinkModal);
	};

	const handleEnableClick = async (): Promise<void> => {
		let payload: SetClientActiveStatusFormDataType = {
			clientId: client.id,
			statusId: client.isActive ? 0 : 1
		};

		const res = await setClientActiveStatus(payload, {
			'x-user-token': $auth?.userToken as string
		});

		if (res?.error === null && res?.error === undefined) {
			client.isActive = !client.isActive;
		}
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
		{#if $auth?.accessType == AccessType.READWRITE}
			<button class="cursor-pointer p-2">
				<img alt="icon-edit" src="/icon-edit.svg" />
			</button>
		{/if}
		<button on:click={handleShowGenerateLinkModal} class="cursor-pointer p-2">
			<img alt="icon-link" src="/icon-link.svg" />
		</button>
	</div>
	<div class="flex w-[10%] items-center justify-center pl-3">
		<label class="inline-flex cursor-pointer items-center">
			<input
				type="checkbox"
				checked={client.isActive}
				class="peer sr-only"
				on:change={handleEnableClick}
			/>
			<div
				class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#18F2A8] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"
			></div>
		</label>
	</div>
</div>

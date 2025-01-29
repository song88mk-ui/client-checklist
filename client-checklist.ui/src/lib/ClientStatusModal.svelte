<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { closeModal } from '$stores/modal';
	import Button from './Button.svelte';
	import Alert from './Alert.svelte';
	import auth from '$stores/auth';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import { clients, selectedClient } from '$stores/client';
	import type { ClientStatusPayload } from '$api/request.DTO.model';
	import type { Client } from '$types/client';

	const { getClientStatus } = APIGateway();

	const handleCancel = () => {
		closeModal();
	};

	const currClient = $clients.find((c: Client) => c.id === $selectedClient?.id);

	let isLoading = false;
	let error = '';

	const handleUpdateStatus = async () => {
		isLoading = true;

		if (currClient !== undefined) {
			let payload: ClientStatusPayload = {
				clientId: currClient.id as string,
				statusId: currClient.isActive ? 0 : 1
			};

			const res = await getClientStatus(payload, {
				'x-user-token': $auth?.userToken as string
			});

			if (res?.error) {
				error = ErrorMessages.ClientStatusFailed;
				return;
			}

			if (res && res?.error === undefined) {
				$clients = $clients.map((c: Client) => {
					if (c.id === currClient.id) {
						return {
							...c,
							isActive: !currClient.isActive
						};
					}

					return c;
				});

				$selectedClient = null;
			}
		}

		isLoading = false;

		closeModal();
	};

	const handleRemoveError = () => {
		error = '';
	};
</script>

<div class="flex min-w-[343px] flex-col justify-center rounded-[12px] bg-[#FFF] p-[24px]">
	<div class="mb-[16px] flex flex-row items-start justify-between">
		<div class="rounded-[50%] bg-[#FFFAEB] p-[10px]">
			<img class="rounded-[50%] bg-[#FEEFC7] p-[8px]" src="/icon-save.svg" alt="delete" />
		</div>
		<button class="cursor-pointer p-2" on:click={handleCancel}>
			<img src="/icon-close.svg" alt="icon-close" />
		</button>
	</div>
	<span class="mb-[4px] text-[20px] font-[600] leading-[28px] text-[#101828]">{currClient?.isActive ? 'Disable Client' : 'Enable Client'}</span>
	<span class="mb-[4px] text-[14px] font-[400] leading-[20px] text-[#475467]"
		>Are you sure you want to {currClient?.isActive ? 'disable' : 'enable'}
		<strong>{currClient?.companyName}</strong>?</span
	>

	{#if error}
		<Alert variant="error" message={error} onClose={handleRemoveError} />
	{/if}

	<div class="mt-[16px] flex w-full flex-col gap-[12px]">
		<Button
			type="button"
			classNames="w-full py-3 bg-[#7F56D9] text-[#FFF] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[transparent] cursor-pointer disabled:opacity-[50%] disabled:cursor-not-allowed"
			click={handleUpdateStatus}
			disabled={isLoading}
		>
			{isLoading && currClient?.isActive
				? 'Disabling...'
				: isLoading && !currClient?.isActive
					? 'Enabling'
					: 'Confirm'}
		</Button>
		<Button
			type="button"
			classNames="w-full py-3 bg-[#FFF] text-[#344054] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[#D0D5DD] cursor-pointer"
			click={() => handleCancel()}
			disabled={isLoading}
		>
			Cancel
		</Button>
	</div>
</div>

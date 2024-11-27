<script lang="ts">
	import { closeModal } from '$stores/modal';
	import Button from './Button.svelte';
	import Alert from './Alert.svelte';
	import auth from '$stores/auth';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import logout from '$utils/logout';

	const handleCancel = () => {
		closeModal();
	};

	let isLoading = false;
	let error = '';

	const handleLogout = async () => {
		isLoading = true;
		const response = await logout($auth?.userToken as string);
		if (response.error) {
			error = ErrorMessages.LogoutFailed;
		}
		isLoading = false;
		closeModal();
	};

	const handleRemoveError = () => {
		error = '';
	};
</script>

<div class="flex max-w-[343px] flex-col justify-center gap-3 rounded-[12px] bg-[#FFF] p-5">
	<div class="flex flex-row items-start justify-between">
		<div class="rounded-[50%] bg-[#FFFAEB] p-[8px]">
			<div class="rounded-[50%] bg-[#FEF0C7] p-[7px]">
				<img src="/icon-save.svg" alt="icon-save" class="h-[18px]" />
			</div>
		</div>
	</div>
	<div>
		<div class="mb-[4px] text-[20px] font-[600] leading-[28px] text-[#101828]">Confirm Logout</div>
		<div class="text-[14px] font-[400] leading-[20px] text-[#475467]">
			You’re about to log out. Any unsaved changes will be lost. Continue?"
		</div>
	</div>

	{#if error}
		<Alert variant="error" message={error} onClose={handleRemoveError} />
	{/if}

	<div class="flex w-full flex-col gap-[12px]">
		<Button
			type="button"
			classNames="w-full py-2 h-[44px] bg-[#7F56D9] text-[#FFF] text-[16px] font-[600] rounded-[8px] border-solid border border-[transparent] cursor-pointer disabled:bg-[#956DEE] disabled:cursor-not-allowed"
			click={handleLogout}
			disabled={isLoading}
		>
			{isLoading ? 'Confirming...' : 'Confirm'}
		</Button>
		<Button
			type="button"
			classNames="w-full py-2 h-[44px] bg-[#FFF] text-[#344054] text-[16px] font-[600] rounded-[8px] border-solid border border-[#D0D5DD] cursor-pointer"
			click={() => handleCancel()}
			disabled={isLoading}
		>
			Cancel
		</Button>
	</div>
</div>

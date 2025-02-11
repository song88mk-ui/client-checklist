<script lang="ts">
	import isConfirm from '$stores/confirm-modal';
	import { closeModal } from '$stores/modal';
	import Button from './Button.svelte';

	const handleCancel = () => {
		$isConfirm = false;
		closeModal();
	};

	const handleConfirm = async () => {
		$isConfirm = true;
		closeModal();
	};
</script>

<div class="flex max-w-[328px] flex-col justify-center rounded-[12px] bg-[#FFF] p-[24px]">
	<div class="mb-[16px] flex flex-row items-start justify-between">
		<div class="rounded-[50%] bg-[#FEF3F2] p-[10px]">
			<img class="rounded-[50%] bg-[#FEE4E2] p-[8px]" src="/icon-delete-red.svg" alt="delete" />
		</div>
		<button class="cursor-pointer p-2" on:click={handleCancel}>
			<img src="/icon-close.svg" alt="icon-close" />
		</button>
	</div>
	<span class="mb-[4px] text-[20px] font-[600] leading-[28px] text-[#101828]">Leave Page?</span>
	<span class="mb-[16px] text-[14px] font-[400] leading-[20px] text-[#475467]"
		>Are you sure you want to leave this page?</span
	>

	<div class="mt-[16px] flex w-full flex-row gap-[12px]">
		<Button
			type="button"
			classNames="w-full py-3 bg-[#FFF] text-[#344054] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[#D0D5DD] cursor-pointer"
			click={handleCancel}
		>
			Cancel
		</Button>
		<Button
			type="button"
			classNames="w-full py-3 bg-[#D92D20] text-[#FFF] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[transparent] cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
			click={handleConfirm}
		>
			Leave Page
		</Button>
	</div>
</div>

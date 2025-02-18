<script lang="ts">
	import { closeModal, modalProps } from '$stores/modal';
	import Button from './Button.svelte';

	const { onConfirm } = $modalProps;
	const handleCancel = () => {
		closeModal();
	};

	const handleConfirm = async () => {
		onConfirm();
		closeModal();
	};
</script>

<div class="flex max-w-[450px] flex-col justify-center rounded-[5px] bg-[#FFF] p-[24px]">
	<div class="mb-[4px] text-[20px] font-[600] leading-[28px] text-[#101828] flex justify-between">
		<div>Unsaved Changes</div>
		<button class="cursor-pointer p-2" on:click={handleCancel}>
			<img src="/icon-close.svg" alt="icon-close" />
		</button>
	</div>
	<div class="mb-[16px] text-[14px] font-[400] leading-[20px] text-[#475467]">You have unsaved changes. Are you sure you want to leave without saving?</div>
	<div class="mt-[16px] w-full text-right gap-[12px]">
		<Button
			type="button"
			classNames="px-3 py-2 w-[110px] bg-[#FFF] text-[#344054] text-[16px] font-[600] rounded-[8px] border-solid border-[2px] border-black cursor-pointer"
			click={handleCancel}
		>
			Cancel
		</Button>
		<Button
			type="button"
			classNames="ml-2 px-3 w-[110px] py-2 bg-black text-[#FFF] text-[16px] font-[600] rounded-[8px] border-solid border-[2px] border-[transparent] cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
			click={handleConfirm}
		>
			Confirm
		</Button>
	</div>
</div>

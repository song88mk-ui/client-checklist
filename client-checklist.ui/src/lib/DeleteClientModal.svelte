<script lang="ts">
	import { closeModal } from "../stores/modal";
	import Button from "./Button.svelte";

    const handleCancel = () => {
        closeModal();
    }

    const handleDelete = () => {

    }

</script>

<div class="max-w-[328px] flex flex-col justify-center rounded-[12px] bg-[#FFF] p-[24px]">
	<div class="mb-[16px] flex flex-row items-start justify-between">
		<div class="bg-[#FEF3F2] p-[10px] rounded-[50%]">
			<img class="bg-[#FEE4E2] p-[8px] rounded-[50%]" src="/icon-delete-red.svg" alt="delete" />
		</div>
		<img class="w-[44px] cursor-pointer" src="/icon-close.svg" alt="close" on:click={handleCancel} />
	</div>
	<span class="mb-[4px] text-[20px] font-[600] leading-[28px] text-[#101828]">Delete Client?</span>
	<span class="mb-[32px] text-[14px] font-[400] leading-[20px] text-[#475467]"
		>Are you sure you want to delete this? Please be certain as this action cannot be undone.</span
	>
	<div class="flex w-full flex-row gap-[12px]">
		<Button
			type="button"
			classNames="w-full py-3 bg-[#FFF] text-[#344054] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[#D0D5DD] cursor-pointer"
            click={() => handleCancel()}
		>
			Cancel
		</Button>
        <Button
			type="button"
			classNames="w-full py-3 bg-[#D92D20] text-[#FFF] text-[16px] font-[600] rounded-[8px] border-solid border-[1px] border-[transparent] cursor-pointer"
            click={() => handleDelete()}
		>
			Delete
		</Button>
	</div>
</div>

<script lang="ts">
	import { openModal } from "../stores/modal";
    import ClientRowStatus from "./ClientRowStatus.svelte";
	import DeleteClientModal from "./DeleteClientModal.svelte";

    export let client: any = {};

    let textCss = "pl-3 py-5 font-[400] text-[13px] text-[#202020] leading-[16.34px]"

    const handleShowDeleteModal = () => {
        openModal(DeleteClientModal);
    }
</script>

<div class="w-full mb-[12px] rounded-[5px] bg-[#FFF] flex flex-row items-center border-[1px] border-solid border-[#D6D6D6]">
    <span class={`${textCss} w-[15%]`}>{client.companyName}</span> 
    <span class={`${textCss} w-[15%]`}>{client.domain}</span> 
    <span class={`${textCss} w-[13%]`}>{client.targetLaunchDate}</span> 
    <span class={`${textCss} w-[27%]`}>{client.services}</span> 
    <span class={`${textCss} w-[13%]`}>{client.mainDecisionMaker}</span> 
    <span class={`${textCss} w-[11%]`}>
        <ClientRowStatus status={client.status} />
    </span> 
    <div class="flex flex-row items-center justify-center gap-[5px] w-[6%] pl-3 py-5 cursor-pointer">
        <img alt="" src="/icon-edit.svg" />
        <img alt="" src="/icon-delete.svg" on:click={handleShowDeleteModal}/>
    </div> 
</div>
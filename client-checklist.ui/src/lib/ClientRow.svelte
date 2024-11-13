<script lang="ts">
    import { openModal } from "../stores/modal";
    import auth from '$stores/auth';
    import ClientRowStatus from "./ClientRowStatus.svelte";
    import DeleteClientModal from "./DeleteClientModal.svelte";
    import { AccessType } from "$enums/role";
    import { format } from 'date-fns';

    export let client: any = {};

    let textCss = "pl-3 py-5 font-[400] text-[13px] text-[#202020] leading-[16.34px]"

    const handleShowDeleteModal = () => {
        openModal(DeleteClientModal);
    }
</script>

<div class="w-full mb-[12px] rounded-[5px] bg-[#FFF] flex flex-row items-center border-[1px] border-solid border-[#D6D6D6]">
    <span class={`${textCss} w-[15%] capitalize`}>{client.companyName}</span> 
    <span class={`${textCss} w-[15%] capitalize`}>{client.domain}</span> 
    <span class={`${textCss} w-[10%]`}>{format(new Date(client.targetLaunchDate), 'MMMM dd, yyyy')}</span> 
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
        <div class="flex flex-row items-center justify-center gap-[5px] w-[10%] pl-3 py-5 cursor-pointer">
            <img alt="" src="/icon-edit.svg" />
            <img alt="" src="/icon-delete.svg" on:click={handleShowDeleteModal}/>
        </div> 
    {/if}
</div>
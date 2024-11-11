<script lang="ts">
	import ClientRow from '$lib/ClientRow.svelte';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import auth from '$stores/auth';
	import { AccessType } from '$enums/role';

	let placeholderValues = [
		{
			companyName: 'WS Gaming',
			domain: 'www.wsgaming.com',
			targetLaunchDate: 'December 25, 2024',
			services: 'Wallet and Sportsbook Integration',
			mainDecisionMaker: 'Nicole Villegas',
			status: ClientRowStatus.Completed
		},
		{
			companyName: 'W88',
			domain: 'www.w88.com',
			targetLaunchDate: 'December 25, 2024',
			services: 'Odds Feed and Live Data Integration',
			mainDecisionMaker: 'Nicole Villegas',
			status: ClientRowStatus.InProgress
		},
		{
			companyName: 'WS Gaming',
			domain: 'www.wsgaming.com',
			targetLaunchDate: 'December 25, 2024',
			services: 'Odds Feed and Live Data Integration',
			mainDecisionMaker: 'Nicole Villegas',
			status: ClientRowStatus.InProgress
		},
		{
			companyName: 'WS Gaming',
			domain: 'www.wsgaming.com',
			targetLaunchDate: 'December 25, 2024',
			services: 'Wallet and Sportsbook Integration',
			mainDecisionMaker: 'Nicole Villegas',
			status: ClientRowStatus.NotStarted
		}
	];
	let headerCss = 'pl-3 font-[600] text-[13px] text-[#000] leading-[16.34px]';
</script>

<div class="mb-[15px] mt-[15px] flex w-full flex-row items-center">
	<span class={`${headerCss} w-[15%]`}>Company</span>
	<span class={`${headerCss} w-[15%]`}>Domain</span>
	<span class={`${headerCss} w-[10%]`}>Target Launch Date</span>
    {#if $auth?.accessType == AccessType.READWRITE}
	    <span class={`${headerCss} w-[30%]`}>Services</span>
    {:else}
	    <span class={`${headerCss} w-[40%]`}>Services</span>
    {/if}
	<span class={`${headerCss} w-[10%]`}>Main Decision Maker</span>
    <span class={`${headerCss} w-[10%]`}>Status</span>
    {#if $auth?.accessType == AccessType.READWRITE}
	    <span class={`${headerCss} w-[10%] text-center`}>Actions</span>
    {/if}
</div>
{#each placeholderValues as client}
	<ClientRow {client} />
{/each}

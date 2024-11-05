<script lang="ts">
	import ClientRow from "../components/ClientRow.svelte";
import Layout from "../components/Layout.svelte";
    import { ClientRowStatus } from "../enums/ClientRowStatus";

	let placeholderValues = [
		{
			companyName: "WS Gaming",
			domain: "www.wsgaming.com",
			targetLaunchDate: "December 25, 2024",
			services: "Wallet and Sportsbook Integration",
			mainDecisionMaker: "Nicole Villegas",
			status: ClientRowStatus.InProgress
		},
		{
			companyName: "W88",
			domain: "www.w88.com",
			targetLaunchDate: "December 25, 2024",
			services: "Odds Feed and Live Data Integration",
			mainDecisionMaker: "Nicole Villegas",
			status: ClientRowStatus.InProgress
		},
		{
			companyName: "WS Gaming",
			domain: "www.wsgaming.com",
			targetLaunchDate: "December 25, 2024",
			services: "Odds Feed and Live Data Integration",
			mainDecisionMaker: "Nicole Villegas",
			status: ClientRowStatus.InProgress
		},
		{
			companyName: "WS Gaming",
			domain: "www.wsgaming.com",
			targetLaunchDate: "December 25, 2024",
			services: "Wallet and Sportsbook Integration",
			mainDecisionMaker: "Nicole Villegas",
			status: ClientRowStatus.InProgress
		}
	]
	let headerCss = "pl-3 font-[600] text-[13px] text-[#000] leading-[16.34px]"
</script>

<Layout>
	<div class="w-full flex flex-row items-center mb-[15px] mt-[15px]">
		<span class={`${headerCss} w-[15%]`}>Company</span> 
		<span class={`${headerCss} w-[15%]`}>Domain</span> 
		<span class={`${headerCss} w-[13%]`}>Target Launch Date</span> 
		<span class={`${headerCss} w-[29%]`}>Services</span> 
		<span class={`${headerCss} w-[13%]`}>Main Decision Maker</span> 
		<span class={`${headerCss} w-[11%]`}>Status</span> 
		<span class={`${headerCss} w-[4%]`}>Actions</span> 
	</div>
	{#each placeholderValues as client}
		<ClientRow client={client} />
	{/each}
</Layout>

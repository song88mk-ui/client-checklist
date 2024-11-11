<script lang="ts">
	export let CompanyName: string = '';
	export let Domain: string = '';
	export let ServiceToProvide: string = '';
	export let LangSupported: string = '';
	export let LaunchDate: string = '';
</script>

<div class="flex flex-col items-start rounded-[4px] border border-[#E1E1E1] bg-white p-6">
	<div class="flex items-start justify-between self-stretch">
		<div class="test">
			<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">{CompanyName}</span>
			<br />
			<span class="text-[16px] font-bold font-normal leading-none text-[#0071BC]"> Song88</span>
		</div>
		<div class="test">
			<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Domain(s)</span>
			<br />
			<span class="text-[16px] font-bold font-normal leading-none text-[#0071BC]"> {Domain}</span>
		</div>
		<div class="test">
			<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Service to Provide</span>
			<br />
			<span class="text-[16px] font-bold font-normal leading-none text-[#0071BC]">
				{ServiceToProvide}</span
			>
		</div>
		<div class="test">
			<span class="text-[11px] font-normal leading-none text-[#7A7A7A]"
				>Languages and Currencies Supported</span
			>
			<br />
			<span class="text-[16px] font-bold font-normal leading-none text-[#0071BC]">
				{LangSupported}</span
			>
		</div>
		<div class="test">
			<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Target Launch Date</span>
			<br />
			<span class="text-[16px] font-bold font-normal leading-none text-[#0071BC]">
				{LaunchDate}</span
			>
		</div>
	</div>
</div>

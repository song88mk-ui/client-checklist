<script lang="ts">
	import Device from '$enums/Device';
	type Props = {
		CompanyName: string;
		Domain: string;
		ServiceToProvide: string;
		LangSupported: string[];
		CurrencySupported: string[];
		LaunchDate: string;
		CurrDevice: Device;
	};
	let {
		CompanyName = '',
		Domain = '',
		ServiceToProvide = '',
		LangSupported = [],
		CurrencySupported,
		LaunchDate = '',
		CurrDevice = Device.Desktop
	}: Props = $props();

	let isCollapse:boolean = $state(true)
    let showAllLanguages:boolean = $state(false);
    let showAllCurrencies:boolean = $state(false);

	const handleCollapse = () => {
		isCollapse = !isCollapse;
	}

    const handleShowAllLanguages = (value: boolean): void => {
        showAllLanguages = value;
    }

    const handleShowAllCurrencies = (value: boolean): void => {
        showAllCurrencies = value;
    }
</script>

{#if CurrDevice === Device.Desktop}
	<div
		class="cc-client-details flex flex-col items-start rounded-[4px] border border-[#E1E1E1] bg-white p-8"
	>
		<div class="flex items-start justify-between self-stretch">
			<div>
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Company Name</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{CompanyName}</span
				>
			</div>
			<div>
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Domain(s)</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]"> {Domain}</span>
			</div>
			<div>
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Service to Provide</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{ServiceToProvide}</span
				>
			</div>
			<div class="max-w-[20%] min-w-[20%]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Languages Supported</span>
				<br />
				<div class="text-[16px] font-bold leading-none text-[#0071BC] text-wrap">
					{showAllLanguages ? LangSupported.join(", ") : LangSupported.slice(0, 8).join(", ")}</div
				>
                <span role="presentation" class="text-[10px] font-bold leading-none text-[#0071BC] cursor-pointer" onclick={() => handleShowAllLanguages(!showAllLanguages)}>
                    {showAllLanguages ? "[View Less]" : "[View More]"}
                </span>
			</div>
			<div class="max-w-[20%] min-w-[20%]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Currencies Supported</span
				>
				<br />
				<div class="text-[16px] font-bold leading-none text-[#0071BC] text-wrap">
					{showAllCurrencies ? CurrencySupported.join(", ") : CurrencySupported.slice(0, 8).join(", ")}</div
				>
                <span role="presentation" class="text-[10px] font-bold leading-none text-[#0071BC] cursor-pointer" onclick={() => handleShowAllCurrencies(!showAllCurrencies)}>
                    {showAllCurrencies ? "[View Less]" : "[View More]"}
                </span>
			</div>
			<div>
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Target Launch Date</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{LaunchDate}</span
				>
			</div>
		</div>
	</div>
{/if}

{#if CurrDevice === Device.Mobile}
	<div
		class="cc-client-details flex flex-col items-start rounded-[4px] border border-[#E1E1E1] bg-white m-[12px] my-4 pb-[6px]"
	>
		<div class="flex flex-row w-full h-[48px]">
			<div class="w-[45%] pl-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Company Name</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{CompanyName}</span
				>
			</div>
			<div class="w-[45%]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Target Launch Date</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{LaunchDate}</span
				>
			</div>
			<div class="w-[10%] m-auto"	onclick={handleCollapse} role="presentation">
				<img src={`${isCollapse ? '/arrow-down.svg': '/arrow-up.svg'}`} alt="logo" />
			</div>
		</div>
		{#if !isCollapse}
		<div class="flex flex-row w-full h-[48px]">
			<div class="w-[45%] pl-[10px]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Domain(s)</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]"> {Domain}</span>
			</div>
			<div class="w-[45%] overflow-hidden text-ellipsis whitespace-nowrap">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Service to Provide</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{ServiceToProvide}</span
				>
			</div>
		</div>
		<div class="flex flex-row w-full h-[48px]">
			<div class="w-[45%] pl-[10px]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Languages Supported</span>
				<br />
				<span class="text-[16px] font-bold leading-none text-[#0071BC]">
					{LangSupported.join()}</span
				>
			</div>
			<div class="w-[45%]">
				<span class="text-[11px] font-normal leading-none text-[#7A7A7A]">Currencies Supported</span
					>
					<br />
					<span class="text-[16px] font-bold leading-none text-[#0071BC]">
						{CurrencySupported.join()}</span
					>
			</div>
		</div>
		{/if}

	</div>
{/if}

<script lang="ts">
	import { onMount } from 'svelte';
	import Environment from '$enums/Environment';
	import Device from '$enums/Device';

	const ENVIRONMENT_ACTIVE: string = 'bg-[#09387B] text-[#FFFFFF]';
	const ENVIRONMENT_INACTIVE: string = 'bg-[#ECECEC] text-[#949090]';

	type Props = {
		NotStarted: number;
		InProgress: number;
		Completed: number;
		CurrEnvironment: Environment;
		HandleChangeEnvironment: Function;
		CurrDevice: Device;
	};
	let {
		NotStarted = 0,
		InProgress = 0,
		Completed = 0,
		CurrEnvironment = Environment.STAGING,
		HandleChangeEnvironment,
		CurrDevice = Device.Desktop
		
	}: Props = $props();


	// @ts-ignore
	function createKeyframes(name, fromWidth, toWidth) {
		const styleSheet = document.styleSheets[0];
		const keyframes = `
        @keyframes ${name} {
          from { width: ${fromWidth}; }
          to { width: ${toWidth}; }
        }
      `;

		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
	}

	function getStyleStatus(){
		const STATUS_TEXT_SIZE_MOBILE = '9px'
		const STATUS_TEXT_SIZE_DESKTOP = '14px'
		let value = STATUS_TEXT_SIZE_MOBILE
		if(CurrDevice === Device.Desktop){
			value = STATUS_TEXT_SIZE_DESKTOP
		}
		return `text-center text-[${value}] font-semibold italic leading-none text-[#524F4F]`

	}
	function getStyleSelectionEnvironment(currEnv:Environment){
		const MOBILE = 'flex-grow'
		const DESKTOP = 'w-[88px]'
		const ADDED_SYTLE = currEnv === Environment.PRODUCTION ? 'rounded-r-lg' : 'rounded-l-lg'
		let value = DESKTOP
		if(CurrDevice === Device.Desktop){
		  value = DESKTOP
		}else{
			value = MOBILE
		}
		return `${CurrEnvironment === currEnv ? ENVIRONMENT_ACTIVE : ENVIRONMENT_INACTIVE} flex h-[44px] ${value} cursor-pointer items-center justify-center border border-solid text-center ${ADDED_SYTLE}` 
	}
	onMount(() => {
		// Create the keyframes
		createKeyframes('fillAnimation1', '0%', `${NotStarted}%`);
		createKeyframes('fillAnimation2', '0%', `${InProgress}%`);
		createKeyframes('fillAnimation3', '0%', `${Completed}%`);
	});
</script>

<div class={`${CurrDevice !== Device.Desktop ? 'm-[10px]':''} mt-6 flex h-5 overflow-hidden rounded-[10px] border border-[#ccc] bg-[#e0e0e0]`}>
	{#if NotStarted !== 0}
		<div
			class="fill-1 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${NotStarted.toFixed(2)}%`}</span
			>
		</div>
	{/if}
	{#if InProgress !== 0}
		<div
			class="fill-2 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${InProgress.toFixed(2)}%`}</span
			>
		</div>
	{/if}

	{#if Completed !== 0}
		<div
			class="fill-3 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${Completed.toFixed(2)}%`}</span
			>
		</div>
	{/if}
</div>

<div class={`mt-[10px] flex flex-${CurrDevice !== Device.Desktop ? 'col':'row'} justify-between`}>
	<div class="flex flex-row">
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #BDBBBB;"
			></div>
			<span class={getStyleStatus()}
				>Not Started</span
			>
		</div>
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #EF7E1D;"
			></div>
			<span class={getStyleStatus()}
				>In Progress</span
			>
		</div>
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #2DBE22;"
			></div>
			<span class={getStyleStatus()}
				>Completed</span
			>
		</div>
	</div>
	<div class={`flex ${CurrDevice !== Device.Desktop ? 'w-fill mx-[12px] my-[24px]':''}`}>
		<div
			role="presentation"
			onclick={() => {
				HandleChangeEnvironment(Environment.STAGING);
			}}
			class={getStyleSelectionEnvironment(Environment.STAGING)}
			>
			Staging
		</div>
		<div
			role="presentation"
			onclick={() => {
				HandleChangeEnvironment(Environment.PRODUCTION);
			}}
			class={getStyleSelectionEnvironment(Environment.PRODUCTION)}
		>
			Production
		</div>
	</div>
</div>

<style>
	.fill-1 {
		background-color: #bdbbbb;
		animation: fillAnimation1 3s forwards;
	}

	.fill-2 {
		background-color: #ef7e1d;
		animation: fillAnimation2 3s 1s forwards;
	}

	.fill-3 {
		background-color: #2dbe22;
		animation: fillAnimation3 3s 2s forwards;
	}
</style>

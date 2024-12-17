<script lang="ts">
	import { onMount } from 'svelte';
	import Environment from '$enums/Environment';

	const ENVIRONMENT_ACTIVE: string = 'bg-[#09387B] text-[#FFFFFF]';
	const ENVIRONMENT_INACTIVE: string = 'bg-[#ECECEC] text-[#949090]';

	type Props = {
		NotStarted: number;
		InProgress: number;
		Completed: number;
		CurrEnvironment: Environment;
		HandleChangeEnvironment: Function;
	};
	let {
		NotStarted = 0,
		InProgress = 0,
		Completed = 0,
		CurrEnvironment = Environment.STAGING,
		HandleChangeEnvironment
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
	onMount(() => {
		// Create the keyframes
		createKeyframes('fillAnimation1', '0%', `${NotStarted}%`);
		createKeyframes('fillAnimation2', '0%', `${InProgress}%`);
		createKeyframes('fillAnimation3', '0%', `${Completed}%`);
	});
</script>

<div class="mt-6 flex h-5 w-full overflow-hidden rounded-[10px] border border-[#ccc] bg-[#e0e0e0]">
	{#if NotStarted !== 0}
		<div
			class="fill-1 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${NotStarted.toFixed(0)}%`}</span
			>
		</div>
	{/if}
	{#if InProgress !== 0}
		<div
			class="fill-2 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${InProgress.toFixed(0)}%`}</span
			>
		</div>
	{/if}

	{#if Completed !== 0}
		<div
			class="fill-3 relative flex h-full w-0 items-center justify-center transition-[width] duration-1000 ease-in-out"
		>
			<span
				class="pointer-events-none absolute z-[1] whitespace-nowrap text-[12px] font-bold text-white"
				>{`${Completed.toFixed(0)}%`}</span
			>
		</div>
	{/if}
</div>

<div class="mt-[10px] flex flex-row justify-between">
	<div class="flex flex-row">
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #BDBBBB;"
			></div>
			<span class="text-center text-[14px] font-semibold italic leading-none text-[#524F4F]"
				>Not Started</span
			>
		</div>
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #EF7E1D;"
			></div>
			<span class="text-center text-[14px] font-semibold italic leading-none text-[#524F4F]"
				>In Progress</span
			>
		</div>
		<div class="flex flex-row items-center justify-center">
			<div
				class="mx-[10px] my-0 h-[12px] w-[12px] self-center rounded-[10px]"
				style="background-color: #2DBE22;"
			></div>
			<span class="text-center text-[14px] font-semibold italic leading-none text-[#524F4F]"
				>Completed</span
			>
		</div>
	</div>
	<div class="flex">
		<div
			role="presentation"
			onclick={() => {
				HandleChangeEnvironment(Environment.STAGING);
			}}
			class={`${CurrEnvironment === Environment.STAGING ? ENVIRONMENT_ACTIVE : ENVIRONMENT_INACTIVE} flex h-[44px] w-[88px] cursor-pointer items-center justify-center rounded-l-lg border border-solid text-center`}
		>
			Staging
		</div>
		<div
			role="presentation"
			onclick={() => {
				HandleChangeEnvironment(Environment.PRODUCTION);
			}}
			class={`${CurrEnvironment === Environment.PRODUCTION ? ENVIRONMENT_ACTIVE : ENVIRONMENT_INACTIVE} flex h-[44px] w-[88px] cursor-pointer items-center justify-center rounded-r-lg border border-solid text-center`}
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

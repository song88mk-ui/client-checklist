<script lang="ts">
	import Icon from '@iconify/svelte';
	import type Step from '$types/step';
    import selectedIntegration from '$stores/integration'
	import { INTEGRATION_STEPS, STATUS_COLORS } from './const';
	import StepStatus from '$enums/StepStatus';

	export let step = 1;

    let steps = INTEGRATION_STEPS[$selectedIntegration];
</script>

<div class="flex">
	{#each steps as { title, status }, index}
		<div class="relative flex flex-1 flex-col items-center">
			<button
				class={`${STATUS_COLORS[status].bg} ${STATUS_COLORS[status].border} z-10 flex h-10 w-10 items-center justify-center rounded-full border-2`}
				on:click={() => { console.log('CHANGE STEP', step); return step += 1}}
			>
				<span class={`font-medium ${STATUS_COLORS[status].icon}`}>
					{#if status === StepStatus.Completed}
						<Icon icon="mdi:check" />
					{:else}
						<Icon icon="mdi:circle" />
					{/if}
				</span>
			</button>
			<div class={`mt-2 text-center text-xs font-medium ${STATUS_COLORS[status].text}`}>
				{title}
			</div>
			{#if index < steps.length - 1}
				<div class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[status].line}`}></div>
			{/if}
		</div>
	{/each}
</div>

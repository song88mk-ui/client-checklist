<script lang="ts">
	import Icon from '@iconify/svelte';
    import selectedIntegration from '$stores/integration'
	import { INTEGRATION_STEPS, STATUS_COLORS } from './const';
	import StepStatus from '$enums/StepStatus';
    import steps from '$stores/steps';
	import Step from '$enums/Step';

    let {step = $bindable()} = $props<{step: number}>()
    
    const updateStep = (index: number) => {
        if ($steps[Step.ClientInformation].ids.length) {
            step = index;
        }
    }

    $effect(() => {
        $steps = INTEGRATION_STEPS[$selectedIntegration];
    });

    $effect(() => {
        if ($steps.length > 0) {
            $steps.forEach((s, i) => {
                if (s.ids.length) s.status = StepStatus.Completed;
                else if (i === step) {
                    s.status = StepStatus.Active;
                } else {
                    s.status = StepStatus.Inactive;
                }
            });
        }
    });

</script>

<div class="flex">
	{#each $steps as { title, status }, index}
		<div class="relative flex flex-1 flex-col items-center">
			<button
				class={`${STATUS_COLORS[status].bg} ${STATUS_COLORS[status].border} z-10 flex h-10 w-10 items-center justify-center rounded-full border-2`}
				onclick={() => updateStep(index)}
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
			{#if index < $steps.length - 1}
				<div class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[status].line}`}></div>
			{/if}
		</div>
	{/each}
</div>

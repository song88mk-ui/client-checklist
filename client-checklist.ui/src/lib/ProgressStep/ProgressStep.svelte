<script lang="ts">
	import Icon from '@iconify/svelte';
	import { STATUS_COLORS } from './const';
	import StepStatus from '$enums/StepStatus';
	import steps from '$stores/steps';
	import selectedIntegration from '$stores/integration';
	import Step from '$enums/Step';
	import type { default as StepType } from '$types/step';
	import { onMount } from 'svelte';

	let { step = $bindable() } = $props<{ step: number }>();
	let serviceSteps = Step[$selectedIntegration];

	const updateStep = (index: number) => {
        if ($steps[serviceSteps.ClientInformation].formData) {
            step = index;
        }
	};

    const actualStepStatus = (item: StepType): StepStatus => {
        if (item.apiError) return StepStatus.HasError;

        return item.formData ? StepStatus.Completed : StepStatus.Inactive;
    }

    const setStepStatus = (): void => {
        let tempSteps: StepType[] = $steps;

        tempSteps = tempSteps.map((item: StepType, index: number) => {
            return {
                ...item,
                status:
                    step === index
                        ? StepStatus.Active
                        : actualStepStatus(item)
            };
        });

        $steps = tempSteps;
    }

    const shouldRender = (): boolean => {
        if ($steps.length === 0) return false;

        if ($steps[step].status !== StepStatus.Active) return true;

        for (var stepIndex in $steps) {
            if ($steps[Number(stepIndex)].status !== actualStepStatus($steps[stepIndex]) && Number(stepIndex) !== step) {
                return true;
            }
        }

        return false;
    }

    onMount(() => {
        setStepStatus();
    })

	$effect(() => {
		if (shouldRender()) {
            setStepStatus();
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
				{#if $steps[index + 1].status === StepStatus.Completed}
					<div
						class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[StepStatus.Completed].line}`}
					></div>
				{:else}
					<div class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[status].line}`}></div>
				{/if}
			{/if}
		</div>
	{/each}
</div>

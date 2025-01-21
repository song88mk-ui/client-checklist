<script lang="ts">
	import Icon from '@iconify/svelte';
	import { STATUS_COLORS } from './const';
	import StepStatus from '$enums/StepStatus';
	import steps from '$stores/steps';
	import selectedIntegration from '$stores/integration';
	import Step from '$enums/Step';

	let { step = $bindable() } = $props<{ step: number }>();
	let serviceSteps = Step[$selectedIntegration];

	const updateStep = (index: number) => {
		if ($steps[serviceSteps.ClientInformation].formData) {
			step = index;
		}
	};

	$effect(() => {
		if ($steps.length > 0) {
			$steps.forEach((s, i) => {
				s.status = s.formData ? StepStatus.Completed : StepStatus.Inactive;

				if (i === step) {
					s.status = StepStatus.Active;
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
				{#if $steps[index + 1].status === StepStatus.Completed}
					<div
						class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[StepStatus.Completed].line}`}></div>
				{:else}
					<div class={`absolute -right-1/2 top-5 h-0.5 w-full ${STATUS_COLORS[status].line}`}></div>
				{/if}
			{/if}
		</div>
	{/each}
</div>

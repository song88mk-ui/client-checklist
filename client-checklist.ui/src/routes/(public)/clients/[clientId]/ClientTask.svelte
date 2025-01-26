<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type ClientStep, type ClientSubtask } from './types';
	import { STEP_NAME } from './constant';
	import ClientTaskStatus from './ClientTaskStatus.svelte';
	import ClientSubtaskComponent from './ClientSubtaskComponent.svelte';
	import { ClientRowStatus } from '$enums/ClientRowStatus';

	export let clientStep: ClientStep;
	let status: number = 0;
	let percentage = '0';

	function toggle() {
		clientStep.isExpanded = !clientStep.isExpanded;
	}

	function calculateProgress(clientSubtasks: ClientSubtask[]) {
		if (clientSubtasks.length > 0) {
			const taskProgress = clientSubtasks.map((item) => item.taskStatus);
			const totalPercentage = calculatePercentage(taskProgress, 3);
			percentage = totalPercentage.toFixed(0);
			if (totalPercentage == 100) {
				status = 2;
				return;
			}
			if (totalPercentage > 0 && totalPercentage <= 100) {
				status = 1;
				return;
			}

			if (totalPercentage === 0) {
				const totalPercentageInProgress = calculatePercentage(taskProgress, 2);
				if (totalPercentageInProgress > 0) {
					status = 1;
					return;
				}
				status = 3;
			}
		}
	}

	function calculatePercentage(items: any, itemToCheck: any): number {
		if (!Array.isArray(items) || items.length === 0) {
			return 0;
		}
		const totalItems = items.filter((item) => item > 0).length;
		const itemCount = items.reduce((count, item) => {
			return item === itemToCheck ? count + 1 : count;
		}, 0);
		const percentage = totalItems > 0 ? (itemCount / totalItems) * 100 : 0;
		return percentage;
	}

	calculateProgress(clientStep.clientSubtasks);
</script>

<div
	on:click={toggle}
	role="presentation"
	class="cc-client-task mt-4 min-h-[94px] cursor-pointer rounded-[4px] border border-[#E1E1E1] bg-white"
>
	<div class="flex items-center justify-between p-6">
		<div class="flex">
			<span
				class="mr-[10px] self-center text-[24px] font-bold font-normal leading-none text-[#0071BC]"
			>{STEP_NAME[clientStep.step]}</span
			>
			<div
				class="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#0071BC] text-[12px] font-bold font-normal leading-none text-white"
			>
				<span>{`${percentage}%`}</span>
			</div>
		</div>
		<div class="flex">
			<div class="mx-[10px]">
				<span class="text-[11px] font-light font-normal leading-none text-[#7A7A7A]"
				>Target Date To Complete</span
				>
				<br />
				<span class="text-[14px] font-bold font-normal leading-none text-[#0071BC]">
					{clientStep.targetDateCompleted ? new Date(clientStep.targetDateCompleted).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										}) : ''}</span
				>
			</div>

			<div class="mx-[10px]">
				<span class="text-[11px] font-light font-normal leading-none text-[#7A7A7A]"
				>Actual Date Completed</span
				>
				<br />
				<span class="text-[14px] font-bold font-normal leading-none text-[#0071BC]">
					{clientStep.actualDateCompleted ? new Date(clientStep.actualDateCompleted).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										}) : ''}</span
				>
			</div>
			<ClientTaskStatus status={status}></ClientTaskStatus>
			<img src={`/${clientStep.isExpanded ? 'arrow-up' : 'arrow-down'}.svg`} alt="logo" />
		</div>
	</div>
	{#if clientStep.isExpanded && clientStep.clientSubtasks.length > 0}
		<div class="mx-[20px]" transition:fly={{ y: -10, duration: 300 }}>
			<table class="mb-[10px] min-w-full">
				<thead class="h-[36px]">
				<tr>
					<th
						class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
					>Description
					</th
					>
					<th
						class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
					>Comments
					</th
					>
					<th
						class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
					>Assigned To
					</th
					>
					<th
						class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
					>Status
					</th
					>
				</tr>
				</thead>
				<tbody>
				{#each clientStep.clientSubtasks as clientSubtask}
					{#if clientSubtask.taskStatus !== ClientRowStatus.NotApplicable}
						<ClientSubtaskComponent clientSubtask={clientSubtask}></ClientSubtaskComponent>
					{/if}
				{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

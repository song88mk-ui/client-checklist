<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type ClientStep, type ClientSubtask } from './types';
	import { STEP_NAME_BY_INTEGRATION } from './constant';
	import ClientTaskStatus from './ClientTaskStatus.svelte';
	import ClientSubtaskComponent from './ClientSubtaskComponent.svelte';
	import { ClientRowStatus } from '$enums/ClientRowStatus';
	import Device from '$enums/Device';

	export let clientStep: ClientStep;
	export let serviceTypeId: number;
	export let CurrDevice: Device;

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

{#if CurrDevice === Device.Desktop}
	<div
		on:click={toggle}
		role="presentation"
		class="cc-client-task mt-4 min-h-[94px] cursor-pointer rounded-[4px] border border-[#E1E1E1] bg-white"
	>
		<div class="flex items-center justify-between p-6">
			<div class="flex">
				<span
					class="mr-[10px] self-center text-[24px] font-bold leading-none text-[#0071BC]"
					>{STEP_NAME_BY_INTEGRATION[serviceTypeId][clientStep.step]}</span
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
					<span class="text-[14px] font-bold leading-none text-[#0071BC]">
						{clientStep.targetDateCompleted
							? new Date(clientStep.targetDateCompleted).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							: ''}</span
					>
				</div>

				<div class="mx-[10px]">
					<span class="text-[11px] font-light font-normal leading-none text-[#7A7A7A]"
						>Actual Date Completed</span
					>
					<br />
					<span class="text-[14px] font-bold leading-none text-[#0071BC]">
						{clientStep.actualDateCompleted
							? new Date(clientStep.actualDateCompleted).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							: ''}</span
					>
				</div>
				<ClientTaskStatus {status} currDevice={CurrDevice}></ClientTaskStatus>
				<img src={`/${clientStep.isExpanded ? 'arrow-up' : 'arrow-down'}.svg`} alt="logo" />
			</div>
		</div>
		{#if clientStep.isExpanded && clientStep.clientSubtasks.length > 0}
			<div class="mx-[20px]" transition:fly={{ y: -10, duration: 300 }}>
				<table class="mb-[10px] min-w-full">
					<thead class="h-[36px]">
						<tr>
							<th
								class="w-2/6 bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
								>Description
							</th>
							<th
								class="w-2/6 bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
								>Comments
							</th>
							<th
								class="w-1/6 bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
								>Assigned To
							</th>
							<th
								class="w-1/6 bg-[#F6F6F6] px-4 py-2 text-center text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
								>Status
							</th>
						</tr>
					</thead>
					<tbody>
						{#each clientStep.clientSubtasks as clientSubtask}
							{#if clientSubtask.taskStatus !== ClientRowStatus.NotApplicable}
								<ClientSubtaskComponent {clientSubtask} assignedTo={clientStep.assignedTo}
								></ClientSubtaskComponent>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
{/if}

{#if CurrDevice === Device.Mobile}
	<div
		on:click={toggle}
		role="presentation"
		class="cc-client-task mx-[12px] mt-4 cursor-pointer rounded-[4px] border border-[#E1E1E1] bg-white"
	>
		<div class="flex items-center justify-between p-4">
			<div class="flex w-[180px]">
				<span
					class="mr-[10px] self-center overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold leading-none text-[#0071BC]"
					>{STEP_NAME_BY_INTEGRATION[serviceTypeId][clientStep.step]}</span
				>
				<div>
					<div
						class="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#0071BC] bg-blue-500 text-[9px] font-bold font-normal leading-none text-white"
					>
						<span>{`${percentage}%`}</span>
					</div>
				</div>
			</div>
			<div class="flex">
				<ClientTaskStatus {status} currDevice={CurrDevice}></ClientTaskStatus>
				<img class="ml-[5px]" src={`/${clientStep.isExpanded ? 'arrow-up' : 'arrow-down'}.svg`} alt="logo" />
			</div>
		</div>

		{#if clientStep.isExpanded}
			<div class="mx-[10px] flex h-[40px] flex-row border-t">
				<div class="h-[20px]">
					<span class="text-[11px] font-normal leading-none text-[#7A7A7A]"
						>Target Date To Complete</span
					>
					<br />
					<span class="text-[14px] font-bold leading-none text-[#0071BC]">
						{clientStep.targetDateCompleted
							? new Date(clientStep.targetDateCompleted).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							: ''}</span
					>
				</div>
				<div class="ml-[40px] h-[20px]">
					<span class="text-[11px] font-normal leading-none text-[#7A7A7A]"
						>Actual Date Completed</span
					>
					<br />
					<span class="text-[14px] font-bold leading-none text-[#0071BC]">
						{clientStep.actualDateCompleted
							? new Date(clientStep.actualDateCompleted).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							: ''}</span
					>
				</div>
			</div>
		{/if}

		{#if clientStep.isExpanded && clientStep.clientSubtasks.length > 0}
			{#each clientStep.clientSubtasks as clientSubtask}
				{#if clientSubtask.taskStatus !== ClientRowStatus.NotApplicable}
					<div
						class="m-[10px] flex flex-row justify-between rounded-[4px] border border-[#F3F3F3] bg-[#FAFAFA] bg-white p-[10px]"
					>
						<div class="flex flex-col">
							<span class="my-[6px] text-[12px] font-semibold text-[#1A1A1A]">Description</span>
							<span class="my-[6px] text-[12px] font-semibold text-[#1A1A1A]">Comments</span>
							<span class="my-[6px] text-[12px] font-semibold text-[#1A1A1A]">Assigned To</span>
							<span class="my-[6px] text-[12px] font-semibold text-[#1A1A1A]">Status</span>
						</div>
						<div class="flex flex-col items-end">
							<span class="my-[6px] h-[18px] text-[12px] text-[#2B2B2B]"
								>{clientSubtask?.subtaskName}</span>
							<span class="my-[6px] h-[18px] text-[12px] text-[#2B2B2B]"
								>{clientSubtask?.comment}</span>
							<span class="my-[6px] h-[18px] text-[12px] text-[#2B2B2B]"
								>{clientStep?.assignedTo}</span
							>
							<ClientTaskStatus {status} currDevice={CurrDevice}></ClientTaskStatus>
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
{/if}

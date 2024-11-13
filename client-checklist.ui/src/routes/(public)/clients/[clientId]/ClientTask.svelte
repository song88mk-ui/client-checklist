<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type ClientTask,type SubTask } from './types';

	const STATUS_BG: any = {
		0: 'bg-[#E3E3E3]',
		1: 'bg-[#FAE9DC]',
		2: 'bg-[#E7FFE4]'
	};
	const STATUS_TEXT: any = {
		0: 'text-[#979797]',
		1: 'text-[#EF7E1D]',
		2: 'text-[#2DBE22]'
	};
	// export let Title: string = "";
	// export let TargetDateComplete: string = "";
	// export let ActualDateComplete: string = "";
	export let clientTask: ClientTask;
	let isOpen = false;
	let status: number = 0;
	status = clientTask.sortOrder;
  let percentage = '';

	function toggle() {
		isOpen = !isOpen;
	}
  function calculateProgress(subTasks: SubTask[]) {
    if(subTasks.length > 0){
      const taskProgress = subTasks.map((item) => item.sortOrder);
		  const totalPercentage = calculatePercentage(taskProgress,1)
      percentage = totalPercentage.toFixed(0)
    }
	}
  function calculatePercentage(items: any, itemToCheck: any):number {
		if (!Array.isArray(items) || items.length === 0) {
			return 0;
		}
		const totalItems = items.length;
		const itemCount = items.reduce((count, item) => {
			return item === itemToCheck ? count + 1 : count;
		}, 0);
		const percentage = (itemCount / totalItems) * 100;
		return percentage;
	}

	function Status(status: number) {
		return `
          <div
              class="mx-[10px] rounded-[24px] ${STATUS_BG[status]} flex px-[2px] justify-center items-center ${STATUS_TEXT[status]} text-[12px] font-normal font-semibold leading-none h-[23px] self-center">
              ${status === 0 ? '<span>In Progress</span>' : ''} 
              ${status === 1 ? '<span>Not Started</span>' : ''}   
              ${status === 2 ? '<span>Completed</span>' : ''}        
          </div>
      `;
	}
  calculateProgress(clientTask.subTasks)
</script>

<div
	on:click={toggle}
	role="presentation"
	class="mt-4 min-h-[94px] cursor-pointer rounded-[4px] border border-[#E1E1E1] bg-white"
>
	<div class="flex items-center justify-between p-6">
		<div class="flex">
			<span
				class="mr-[10px] self-center text-[24px] font-bold font-normal leading-none text-[#0071BC]"
				>{clientTask.taskName}</span
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
					{clientTask.targetDateCompleted}</span
				>
			</div>

			<div class="mx-[10px]">
				<span class="text-[11px] font-light font-normal leading-none text-[#7A7A7A]"
					>Actual Date Completed</span
				>
				<br />
				<span class="text-[14px] font-bold font-normal leading-none text-[#0071BC]"
					>{clientTask.actualDateCompleted}</span
				>
			</div>
			<div
				class={`mx-[10px] rounded-[24px] ${STATUS_BG[status]} flex items-center justify-center px-[12px] ${STATUS_TEXT[status]} h-[23px] self-center text-[12px] font-normal font-semibold leading-none`}
			>
				{#if status === 1}
					<span>In Progress</span>
				{/if}
				{#if status === 0}
					<span>Not Started</span>
				{/if}
				{#if status === 2}
					<span>Completed</span>
				{/if}
			</div>
			<img src={`/${isOpen ? 'arrow-up' : 'arrow-down'}.svg`} alt="logo" />
		</div>
	</div>
	{#if isOpen && clientTask.subTasks.length > 0}
		<div class="mx-[20px]" transition:fly={{ y: -10, duration: 300 }}>
			<table class="mb-[10px] min-w-full">
				<thead class="h-[36px]">
					<tr>
						<th
							class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
							>Description</th
						>
						<th
							class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
							>Comments</th
						>
						<th
							class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
							>Assigned To</th
						>
						<th
							class="bg-[#F6F6F6] px-4 py-2 text-start text-[14px] font-normal font-semibold leading-normal text-[#1A1A1A]"
							>Status</th
						>
					</tr>
				</thead>
				<tbody>
					{#each clientTask.subTasks as subTask}
						<tr>
							<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
								>{subTask.subtaskName}</td
							>
							<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
								>{subTask.comment}</td
							>
							<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
								>{subTask.comment}</td
							>
							<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
								>{@html Status(subTask.sortOrder)}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

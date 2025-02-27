<script lang="ts">
	import Device from '$enums/Device';
	let { clientSubtask, assignedTo, device } = $props();

	const TASK_STATUS_BG: Record<number, string> = {
		0: 'bg-[#FAEDCC]',
		1: 'bg-[#E3E3E3]',
		2: 'bg-[#FAE9DC]',
		3: 'bg-[#E7FFE4]'
	};

	const TASK_STATUS_TEXT: Record<number, string> = {
		0: 'text-[#C39646]',
		1: 'text-[#979797]',
		2: 'text-[#EF7E1D]',
		3: 'text-[#2DBE22]'
	};

	const TASK_STATUS_MESSAGE: Record<number, string> = {
		0: 'Not Applicable',
		1: 'Not Started',
		2: 'In Progress',
		3: 'Completed'
	};

	function TaskStatus(taskstatus: number) {
		if (device === Device.Mobile) {
			return `
          <div
              class="rounded-[24px] ${TASK_STATUS_BG[taskstatus]} px-[10px] flex justify-center items-center ${TASK_STATUS_TEXT[taskstatus]} text-[10px] font-normal leading-none h-[23px] self-center">
			  ${TASK_STATUS_MESSAGE[taskstatus]}
          </div>
      `;
		}
		return `
          <div
              class="mx-[10px] rounded-[24px] ${TASK_STATUS_BG[taskstatus]} flex px-[2px] justify-center items-center ${TASK_STATUS_TEXT[taskstatus]} text-[12px] font-normal font-semibold leading-none h-[23px] self-center">
			  ${TASK_STATUS_MESSAGE[taskstatus]}
          </div>
      `;
	}
	console.log(assignedTo)
</script>

{#if device === Device.Desktop}
	<tr class="cc-client-subtask-component">
		<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
			>{clientSubtask.subtaskName}</td
		>
		<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
			>{clientSubtask.comment}</td
		>
		<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
			>{assignedTo}</td
		>
		<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
			>{@html TaskStatus(clientSubtask.taskStatus)}</td
		>
	</tr>
{/if}

{#if device === Device.Mobile}
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
			<span class="my-[6px] h-[18px] text-[10px] text-[#2B2B2B]">{clientSubtask?.subtaskName}</span>
			<span class="my-[6px] h-[18px] text-[10px] text-[#2B2B2B]">{clientSubtask?.comment}</span>
			<span class="my-[6px] h-[18px] text-[10px] text-[#2B2B2B]">{assignedTo}</span>
			<span>{@html TaskStatus(clientSubtask.taskStatus)}</span>
		</div>
	</div>
{/if}

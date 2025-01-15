<script lang="ts">
	let {clientSubtask} = $props()

	const TASK_STATUS_BG: Record<number,string> = {
		0: 'bg-[#FAEDCC]',
		1: 'bg-[#E3E3E3]',
		2: 'bg-[#FAE9DC]',
		3: 'bg-[#E7FFE4]'
	}

	const TASK_STATUS_TEXT: Record<number,string> = {
		0: 'text-[#C39646]',
		1: 'text-[#979797]',
		2: 'text-[#EF7E1D]',
		3: 'text-[#2DBE22]'
	}

	const TASK_STATUS_MESSAGE: Record<number, string> = {
		0: 'Not Applicable',
		1: 'Not Started',
		2: 'In Progress',
		3: 'Completed'
	}

	function TaskStatus(taskstatus: number) {
		return `
          <div
              class="mx-[10px] rounded-[24px] ${TASK_STATUS_BG[taskstatus]} flex px-[2px] justify-center items-center ${TASK_STATUS_TEXT[taskstatus]} text-[12px] font-normal font-semibold leading-none h-[23px] self-center">
			  ${TASK_STATUS_MESSAGE[taskstatus]}
          </div>
      `;
	}
</script>

<tr class="cc-client-subtask-component">
	<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
	>{clientSubtask.subtaskName}</td
	>
	<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
	>{clientSubtask.comment}</td
	>
	<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
	>{clientSubtask.comment}</td
	>
	<td class="border-b border-[#ECECEC] px-4 py-2 text-start text-[14px] text-[#1A1A1A]"
	>{@html TaskStatus(clientSubtask.taskStatus)}</td
	>
</tr>
<script lang="ts">
	let {status} = $props()

	const STATUS_BG: Record<number, string> = {
		3: 'bg-[#E3E3E3]',
		1: 'bg-[#FAE9DC]',
		2: 'bg-[#E7FFE4]'
	}

	const STATUS_MESSAGE: Record<number, string> = {
		3: 'Not Started',
		1: 'In Progress',
		2: 'Completed'
	}

	const STATUS_TEXT: Record<number, string> = {
		3: 'text-[#979797]',
		1: 'text-[#EF7E1D]',
		2: 'text-[#2DBE22]'
	}
</script>
<div
	class={`cc-client-task-status mx-[10px] rounded-[24px] ${STATUS_BG[status === 0 ? 3 : status]} flex items-center justify-center px-[12px] ${STATUS_TEXT[status === 0 ? 3: status]} h-[23px] self-center text-[12px] font-normal font-semibold leading-none`}
>
	{STATUS_MESSAGE[status === 0 ? 3 : status]}
</div>
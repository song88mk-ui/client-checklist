<script lang="ts">
	import { ClientRowStatus } from '../enums/ClientRowStatus';

	export let status: ClientRowStatus = ClientRowStatus.NotStarted;
	export let className: string = '';

	let statusDefault = `px-5 py-2 rounded-[50px] text-[12px] font-[600] leading-[15px] w-fit ${className} text-center `;
	let statusText = '';
	let statusCss = '';

	$: switch (status) {
		case ClientRowStatus.NotStarted:
			statusCss = 'bg-[#E3E3E3] text-[#979797]';
			statusText = 'Not Started';
			break;
		case ClientRowStatus.InProgress:
			statusCss = 'bg-[#FAE9DC] text-[#EF7E1D]';
			statusText = 'In Progress';
			break;
		case ClientRowStatus.Completed:
			// Update this to proper colors, not in mockup yet
			statusCss = 'bg-[#E7FFE4] text-[#2DBE22]';
			statusText = 'Completed';
			break;
		default:
			break;
	}
</script>

<div class={statusDefault + statusCss}>{statusText}</div>

<script lang="ts">
	import { type ClientSubTaskFormType } from './validationSchema';
	import type { ClientRowStatus } from '$enums/ClientRowStatus';
	import StatusSelect from '$lib/StatusSelect.svelte';

	let { name, clientSubTasks, updateField, errors, disabled = false } = $props<{
		name?: string;
		clientSubTasks: ClientSubTaskFormType;
		updateField?: (field: string | number | symbol, value: any) => void;
		errors?: unknown;
		disabled?: boolean;
	}>();

	let localSubtasks = $state(clientSubTasks);

	const handleSelectStatus = (index: number, status: ClientRowStatus) => {
		updateField(`${name}.${index}.taskStatusId`, status);
		localSubtasks = clientSubTasks
	};

	const handleChange = (index: number, value: string) => {
		updateField(`${name}.${index}.comment`, value);
	};
</script>

<table>
	<thead class="bg-[#F6F6F6]">
		<tr>
			<th scope="col" class="py-2 pl-3 pr-2 text-left text-sm font-semibold text-[#1A1A1A]">
				Description
			</th>
			<th scope="col" class="p-2 text-left text-sm font-semibold text-[#1A1A1A]"> Comments </th>
			<th scope="col" class="py-2 pl-2 pr-3 text-left text-sm font-semibold text-[#1A1A1A]">
				Status
			</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-200 border-b bg-white">
		{#each localSubtasks as subTask, index}
			<tr>
				<td class="whitespace-nowrap py-4 pl-5 pr-2 align-top text-sm text-gray-900">
					<div class="flex h-[38px] items-center">
						{subTask.subtaskName}
					</div>
				</td>
				<td class="w-[50%] whitespace-nowrap px-2 py-4 align-top text-sm text-gray-900">
					<input
						class="block w-full rounded border px-3 py-2 text-sm text-gray-700"
						type="text"
						placeholder="Comments"
						value={subTask.comment}
						onchange={(e) => handleChange(index, (e.target as HTMLInputElement).value || '')}
						{disabled}
					/>
					{#if errors[index].comment}
						<small class="text-red-500 font-bold">{errors[index].comment}</small>
					{/if}
				</td>
				<td class="w-[20%] whitespace-nowrap py-4 pl-2 pr-5 align-top text-sm text-gray-900">
					<StatusSelect
						value={subTask.taskStatusId}
						onSelectStatus={(status) => handleSelectStatus(index, status)}
                        elementId={`${name}-${subTask.subtaskName}-status`}
						{disabled}
					/>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<script lang="ts">
	import DateInput from '../DateInput.svelte';
	import { createForm } from 'svelte-forms-lib';
	import validationSchema, { type ProductFormType } from './validationSchema';
	import StatusSelect from '$lib/StatusSelect.svelte';
	import type { ClientRowStatus } from '$enums/ClientRowStatus';
	import { AssignedTo } from '$enums/AssignedTo';

	let { initialValues, onStepBack, onSubmit } = $props<{
		initialValues: ProductFormType;
		onStepBack?: () => void;
		onSubmit: (values: ProductFormType) => void;
	}>();

	const { form, errors, handleChange, handleSubmit, updateField } = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});

	const handleSelectDate = (field: keyof ProductFormType, selectedDate: Date) => {
		updateField(field, selectedDate.toISOString());
	};

	const handleSelectStatus = (index: number, status: ClientRowStatus) => {
		updateField(`clientSubTasks.${index}.taskStatusId` as keyof ProductFormType, status);
	};

	const assignedToOptions = [
		AssignedTo.BACKEND_DEVELOPMENT_TEAM,
		AssignedTo.BACKEND_DEVELOPMENT_TEAM,
		AssignedTo.UI_UX_DESIGN_TEAM,
		AssignedTo.QA,
		AssignedTo.BUSINESS_ANALYST_TEAM,
		AssignedTo.PRODUCTION_TEAM,
		AssignedTo.CLIENT
	];
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-7">
	<div class="flex flex flex-col flex-col gap-5 rounded-md border bg-white px-6 py-[30px]">
		<div class="flex flex-col gap-5">
			<h2 class="text-lg font-bold italic">Song88 Back Office</h2>
			<div class="flex gap-3">
				<div class="flex-1">
					<label
						class="mb-2 block text-xs font-semibold text-gray-700"
						for="backendDevelopmentTeam"
					>
						Assigned To <span class="text-red-500">*</span>
					</label>
					<select
						class="w-full rounded border px-3 py-2 text-sm text-gray-700"
						id="assignedTo"
						onchange={handleChange}
						value={$form.assignedTo}
					>
						<option value="">Select an option</option>
						{#each assignedToOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
					{#if $errors.assignedTo}
						<small class="text-red-500">{$errors.assignedTo}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="targetDate">
						Target Date to Complete
					</label>
					<DateInput
						value={new Date($form.targetDateCompleted)}
						onSelectDate={(selectedDate) => handleSelectDate('targetDateCompleted', selectedDate)}
					/>
					{#if $errors.targetDateCompleted}
						<small class="text-red-500">{$errors.targetDateCompleted}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="actualDate">
						Actual Date Completed
					</label>
					<DateInput
						value={new Date($form.actualDateCompleted)}
						onSelectDate={(selectedDate) => handleSelectDate('actualDateCompleted', selectedDate)}
					/>
					{#if $errors.actualDateCompleted}
						<small class="text-red-500">{$errors.actualDateCompleted}</small>
					{/if}
				</div>
			</div>
		</div>
		<table>
			<thead class="bg-[#F6F6F6]">
				<tr>
					<th scope="col" class="py-2 pl-3 pr-2 text-left text-sm font-semibold text-[#1A1A1A]">
						Task
					</th>
					<th scope="col" class="p-2 text-left text-sm font-semibold text-[#1A1A1A]"> Status </th>
					<th scope="col" class="py-2 pl-2 pr-3 text-left text-sm font-semibold text-[#1A1A1A]">
						Actions
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each $form.clientSubTasks as subTask, index}
					<tr>
						<td class="whitespace-nowrap py-4 pl-5 pr-2 text-sm text-gray-900">
							{subTask.subtaskName}
						</td>
						<td class="w-[50%] whitespace-nowrap px-2 py-4 text-sm text-gray-900">
							<input
								class="w-full rounded border px-3 py-2 text-sm text-gray-700"
								type="text"
								placeholder="Comments"
								value={subTask.comment}
							/>
						</td>
						<td class="w-[20%] whitespace-nowrap py-4 pl-2 pr-5 text-sm text-gray-900">
							<StatusSelect
								value={subTask.taskStatusId}
								onSelectStatus={(status) => handleSelectStatus(index, status)}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="text-right">
		<div class="inline-flex gap-2">
			<button
				type="button"
				class="h-[40px] w-24 rounded-md border-2 border-slate-800 bg-white px-5 py-2 leading-none"
				onclick={onStepBack}>Back</button
			>
			<button class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				>Next</button
			>
		</div>
	</div>
</form>

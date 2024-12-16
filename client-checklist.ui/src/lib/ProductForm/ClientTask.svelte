<script lang="ts">
	import DateInput from '../DateInput.svelte';
	import { type ClientTaskFormType } from './validationSchema';
	import { AssignedTo } from '$enums/AssignedTo';
	import ClientSubTasks from './ClientSubTasks.svelte';
	import hasValue from '$utils/hasValue';

	let { title, name, clientTask, updateField, errors } = $props<{
		title?: string;
		name?: string;
		clientTask: ClientTaskFormType;
		updateField?: (field: string | number | symbol, value: any) => void;
		errors?: unknown;
	}>();

	const handleSelectDate = (field: keyof ClientTaskFormType, selectedDate: Date) => {
		updateField(`${name}.${field}`, selectedDate.toISOString());
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		updateField(`${name}.assignedTo`, target.value);
	};

	const assignedToOptions = [
		AssignedTo.BACKEND_DEVELOPMENT_TEAM,
		AssignedTo.FRONTEND_DEVELOPMENT_TEAM,
		AssignedTo.UI_UX_DESIGN_TEAM,
		AssignedTo.QA,
		AssignedTo.BUSINESS_ANALYST_TEAM,
		AssignedTo.PRODUCTION_TEAM,
		AssignedTo.CLIENT
	];

	let isShowTask = $state(true);

	const handleShowTask = () => {
		isShowTask = !isShowTask;
	};

	$effect(() => {
		if (hasValue(errors)) {
			isShowTask = true;
		}
	});
</script>

<div class="flex flex flex-col flex-col gap-5 rounded-md border bg-white px-6 py-[30px]">
	<div class="flex justify-between">
		<h2 class="text-lg font-bold italic">{title}</h2>
		<button type="button" class="-mr-2 p-2" onclick={handleShowTask}>
			<img
				src="/icon-accordion.svg"
				alt="icon-accordion"
				class={`h-[12px] w-[12px] ${isShowTask ? 'rotate-180' : ''}`}
			/>
		</button>
	</div>
	{#if isShowTask}
		<div class="flex flex-col gap-5">
			<div class="flex gap-3">
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="assignedTo">
						Assigned To <span class="text-red-500 font-bold">*</span>
					</label>
                    <div class="w-full rounded border">
                        <select
                            class="w-full rounded pl-[10px] border-solid border-r-[8px] border-[transparent] py-2 text-sm text-gray-700"
                            id="assignedTo"
                            onchange={handleChange}
                            value={clientTask.assignedTo}
                        >
                            <option value="">Select an option</option>
                            {#each assignedToOptions as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
                    </div>
					{#if errors.assignedTo}
						<small class="text-red-500 font-bold">{errors.assignedTo}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="targetDate">
						Target Date to Complete
					</label>
					<DateInput
						value={clientTask.targetDateCompleted}
						onSelectDate={(selectedDate) => handleSelectDate('targetDateCompleted', selectedDate)}
					/>
					{#if errors.targetDateCompleted}
						<small class="text-red-500 font-bold">{errors.targetDateCompleted}</small>
					{/if}
				</div>
				<div class="flex-1">
					<label class="mb-2 block text-xs font-semibold text-gray-700" for="actualDate">
						Actual Date Completed
					</label>
					<DateInput
						value={clientTask.actualDateCompleted}
						onSelectDate={(selectedDate) => handleSelectDate('actualDateCompleted', selectedDate)}
					/>
					{#if errors.actualDateCompleted}
						<small class="text-red-500 font-bold">{errors.actualDateCompleted}</small>
					{/if}
				</div>
			</div>
			<ClientSubTasks
				name={`${name}.clientSubTasks`}
				clientSubTasks={clientTask.clientSubTasks}
				errors={errors.clientSubTasks}
				{updateField}
			/>
		</div>
	{/if}
</div>

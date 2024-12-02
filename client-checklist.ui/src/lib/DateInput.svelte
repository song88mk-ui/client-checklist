<script lang="ts">
	import { DatePicker } from 'date-picker-svelte';
	import { format } from 'date-fns';

	let { value, onSelectDate } = $props<{
		value: string;
		onSelectDate?: (selectedDate: Date) => void;
	}>();

	let isShowDatePicker = $state(false);
	let valueAsDate = $state(value ? new Date(value) : new Date());
	let formattedValue = $state(format(valueAsDate, 'MMMM d, yyyy') || '');

	const handleFocusOut = (e: FocusEvent) => {
		if (
			e?.currentTarget instanceof HTMLElement &&
			e.relatedTarget &&
			e.relatedTarget instanceof Node &&
			e.currentTarget.contains(e.relatedTarget)
		) {
			return;
		} else {
			const target = e.target as HTMLInputElement | null;
			if (target && !target.value) {
				isShowDatePicker = false;
			}
		}
	};

	const handleShowDatePicker = () => {
		isShowDatePicker = true;
	};

	const handleSelectDate = (e: CustomEvent<Date>) => {
		onSelectDate(e.detail);
		formattedValue = format(e.detail, 'MMMM d, yyyy');
		isShowDatePicker = false;
	};

	const handleChangeDate = (e: Event) => {
		e.preventDefault();
		const newValue = new Date((e.target as HTMLInputElement).value);
		if (!isNaN(newValue.getTime())) {
			formattedValue = format(newValue, 'MMMM d, yyyy');
			onSelectDate(newValue);
		} else {
			formattedValue = format(value || new Date(), 'MMMM d, yyyy');
		}
	};
</script>

<div class="relative" onfocusout={handleFocusOut}>
	<input
		class="w-full rounded border px-3 py-2 text-sm text-gray-700"
		id="backendDevelopmentTeam"
		type="text"
		autocomplete="off"
		placeholder="Backend Development Team"
		onclick={handleShowDatePicker}
		onchange={handleChangeDate}
		value={formattedValue}
	/>

	{#if isShowDatePicker}
		<div class="absolute z-10">
			<DatePicker value={valueAsDate} on:focusout={handleFocusOut} on:select={handleSelectDate} />
		</div>
	{/if}
</div>

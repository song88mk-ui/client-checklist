<script lang="ts">
	import { DatePicker } from 'date-picker-svelte';
	import { format, addYears, endOfYear } from 'date-fns';
	import { preventDefault } from 'svelte/legacy';

	let { placeholder, value, onSelectDate, disabled = false } = $props<{
        placeholder: string;
		value: any;
		onSelectDate?: (selectedDate: Date) => void;
		disabled?: boolean;
	}>();

	let prevValue = value;
	let isShowDatePicker = $state(false);
	let valueAsDate = $state(value ? new Date(value) : new Date());
	let formattedValue = $state(value ? format(valueAsDate, 'MMMM d, yyyy') : '');
	let max = endOfYear(addYears(new Date(), 1));

	$effect(() => {
		if (prevValue === value) return;

        valueAsDate = value ? new Date(value) : new Date();
        formattedValue = value ? format(valueAsDate, 'MMMM d, yyyy') : '';

		prevValue = value;
	});

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
		class="w-full rounded border px-3 py-2 text-sm text-gray-700 bg-[url('/icon-calendar.svg')] bg-no-repeat bg-[center_right_12px]"
		id="backendDevelopmentTeam"
		type="text"
		autocomplete="off"
		placeholder={placeholder}
		onclick={handleShowDatePicker}
		onchange={handleChangeDate}
		value={formattedValue}
		{disabled}
        onkeypress={(e: any) => {
            e.preventDefault();
            return;
        }}
	/>

	{#if isShowDatePicker && !disabled}
		<div class="absolute z-10">
			<DatePicker {max} value={valueAsDate} on:focusout={handleFocusOut} on:select={handleSelectDate} />
		</div>
	{/if}
</div>

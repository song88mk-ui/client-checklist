<script lang="ts">
	import { addYears, endOfYear, format } from 'date-fns';
	import { DatePicker } from 'date-picker-svelte';

	let {
		placeholder,
		value,
		onSelectDate,
        inputId,
		disabled = false
	} = $props<{
		placeholder: string;
		value: any;
		onSelectDate?: (selectedDate: Date) => void;
        inputId: string;
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
        const parentElement = document.getElementById(inputId)
		const relatedTarget = e.relatedTarget as Node;

		if (e.relatedTarget === null || (parentElement !== null && !parentElement.contains(relatedTarget))) {
			isShowDatePicker = false;
		}
	};

	const handleShowDatePicker = (e: any) => {
        if (disabled) return;

        e.target.focus();
		isShowDatePicker = true;
	};

	const handleSelectDate = (e: CustomEvent<Date>) => {
		onSelectDate(e.detail);
		formattedValue = format(e.detail, 'MMMM d, yyyy');
		isShowDatePicker = false;
	};
</script>

<div
    id={inputId}
	class="relative w-full rounded border bg-[url('/icon-calendar.svg')] bg-[center_right_12px] bg-no-repeat px-3 py-2"
	role="presentation"
    tabindex="-1"
    onfocusout={handleFocusOut}
    onclick={(e: any) => handleShowDatePicker(e)}
>
    <span class="text-sm text-gray-700">{value ? formattedValue : placeholder}</span>
	{#if isShowDatePicker && !disabled}
		<div class="absolute z-10 left-[0px] top-[45px]">
			<DatePicker {max} value={valueAsDate} on:select={handleSelectDate} />
		</div>
	{/if}
</div>

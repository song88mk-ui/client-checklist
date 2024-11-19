<script lang="ts">
	import { DatePicker } from 'date-picker-svelte';
	import { format } from 'date-fns';

	export let value = new Date();
	export let onSelectDate: (selectedDate: Date) => void;

	let isShowDatePicker = false;
	let formattedValue = format(value, 'MMMM d, yyyy');

	const handleFocusOut = (e: FocusEvent) => {
		if (
			e?.currentTarget instanceof HTMLElement &&
			e.relatedTarget &&
			e.relatedTarget instanceof Node &&
			e.currentTarget.contains(e.relatedTarget)
		) {
			return;
		} else {
			isShowDatePicker = false;
		}
	};

	const handleShowDatePicker = () => {
		isShowDatePicker = true;
	};

	const handleSelectDate = (e: CustomEvent<Date>) => {
		if (onSelectDate) onSelectDate(e.detail);
		isShowDatePicker = false;
	};

	const handleChangeDate = (e: Event) => {
		const newValue = new Date((e.target as HTMLInputElement).value);
		if (!isNaN(newValue.getTime())) {
			formattedValue = format(newValue, 'MMMM d, yyyy');
			onSelectDate(newValue);
		} else {
			formattedValue = format(value, 'MMMM d, yyyy');
		}
	};

	$: formattedValue = format(value, 'MMMM d, yyyy');
</script>

<div class="relative" on:focusout={handleFocusOut}>
	<input
		class="w-full rounded border px-3 py-2 text-sm text-gray-700"
		id="backendDevelopmentTeam"
		type="text"
		placeholder="Backend Development Team"
		on:click={handleShowDatePicker}
		on:change={handleChangeDate}
		bind:value={formattedValue}
	/>

	{#if isShowDatePicker}
		<div class="absolute">
			<DatePicker {value} on:focusout={handleFocusOut} on:select={handleSelectDate} />
		</div>
	{/if}
</div>

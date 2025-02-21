<script lang="ts">
	import steps from '$stores/steps';

	let { onSelectedOption, disabled, options, selectedType, placeholder, showOption, onShow } = $props();

	let formData = $steps[0]?.formData;

	let initialOptions = []
	switch (selectedType) {
		case 'languages':
			initialOptions = formData?.languages ? (formData.languages as string).split(',').filter(x => x !== '') : [];
			break;
		case 'currencies':
			initialOptions = formData?.currencies ? (formData.currencies as string).split(',').filter(x => x !== '') : [];
			break;
		case 'sports':
			initialOptions = formData?.sports ? (formData.sports as string).split(',').filter(x => x !== '') : [];
			break;
		default:
			initialOptions = formData?.markets ? (formData.markets as string).split(',').filter(x => x !== '') : [];
	}

	let selectedItems: string[] = $state(initialOptions);

	$effect(() => {
		onSelectedOption(selectedItems.join());
	});

	const toggleVisibility = () => {
		onShow(!showOption);
	};
	const addItem = (item: string) => {
		if (!selectedItems.includes(item)) {
			selectedItems = [...selectedItems, item];
		}
	};
	const removeItem = (item: string) => {
		selectedItems = selectedItems.filter((x) => x != item);
	};
</script>

<div
	class="cc-enhance-dropdown relative flex min-h-[38px] items-center justify-between rounded border px-3"
>
	<div class="flex flex-row text-[11px]">
		{#if selectedItems.length < 1}
			<div class="text-sm text-gray-700">{placeholder}</div>
		{:else}
			{#each selectedItems as item}
				<div
					class="mr-[10px] flex flex-row items-center rounded bg-gray-100 px-2 py-1 font-bold text-gray-600"
				>
					{item}
					<button type="button" onclick={() => removeItem(item)} {disabled}>
						<img class="h-[9px] pl-3" src="/icon-close.svg" alt="remove item" />
					</button>
				</div>
			{/each}
		{/if}
	</div>
	<button type="button" onclick={toggleVisibility} {disabled}>
		<img class="" src={showOption ? '/arrow-up.svg' : '/arrow-down.svg'} alt="logo" />
	</button>
	<div
		class={`${showOption ? '' : 'hidden'} absolute left-0 top-[43px] z-10 max-h-[200px] w-full overflow-auto rounded border bg-white px-3 py-2 text-[12px]`}
	>
		{#each options as item}
			<div
				role="presentation"
				class="cursor-pointer py-1 font-bold text-gray-400"
				onclick={() => {
					addItem(item);
					onShow(false);
				}}
			>
				{item}
			</div>
		{/each}
	</div>
</div>

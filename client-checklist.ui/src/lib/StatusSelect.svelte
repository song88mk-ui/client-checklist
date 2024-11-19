<script lang="ts">
	import ClientRowStatus from './ClientRowStatus.svelte';
	import { ClientRowStatus as ClientRowStatusEnum } from '$enums/ClientRowStatus';

	export let value = ClientRowStatusEnum.NotStarted;
	export let onSelectStatus: (selectedStatus: ClientRowStatusEnum) => void;

	let isShow = false;

	const toggle = () => {
		isShow = !isShow;
	};

	const handleSelectStatus = (status: ClientRowStatusEnum) => {
		onSelectStatus(status);
		isShow = false;
	};

	const handleFocusOut = (e: FocusEvent) => {
		if (
			e?.currentTarget instanceof HTMLElement &&
			e.relatedTarget &&
			e.relatedTarget instanceof Node &&
			e.currentTarget.contains(e.relatedTarget)
		) {
			return;
		} else {
			isShow = false;
		}
	};

	const statusOptions = [
		ClientRowStatusEnum.NotStarted,
		ClientRowStatusEnum.InProgress,
		ClientRowStatusEnum.Completed
	];
</script>

<div
	class="relative w-full rounded border border text-sm text-gray-700"
	on:focusout={handleFocusOut}
>
	<div class="flex px-3 py-2 pr-1">
		<div class="flex-1">
			<ClientRowStatus className="w-full" status={value} />
		</div>
		<div class="flex items-center">
			<button type="button" class="p-2" on:click={toggle}>
				<img
					src="/icon-arrow-down.svg"
					alt="icon-arrow-down"
					class={`h-[12px] w-[12px] ${isShow ? 'rotate-180' : ''}`}
				/>
			</button>
		</div>
	</div>
	{#if isShow}
		<div
			class="absolute right-0 z-10 flex w-56 w-full origin-top-right flex-col gap-2 rounded-md bg-white px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
			on:focusout={handleFocusOut}
		>
			{#each statusOptions as option}
				<button type="button" on:click={() => handleSelectStatus(option)}>
					<ClientRowStatus className="w-full" status={option} />
				</button>
			{/each}
		</div>
	{/if}
</div>

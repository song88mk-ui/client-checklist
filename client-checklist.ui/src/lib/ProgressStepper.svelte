<script lang="ts">
	import Icon from '@iconify/svelte';
	import type Step from '$types/step';

	let steps: Step[] = [
			{ id: '1', title: 'Contact Information', status: 'completed' },
			{ id: '2', title: 'Back Office', status: 'active' },
			{ id: '3', title: 'Wallet Integration', status: 'inactive' },
			{ id: '4', title: 'Sportsbook Player Site UI/UX', status: 'inactive' },
			{ id: '5', title: 'Manage Trading Services', status: 'inactive' },
			{ id: '6', title: 'Operations', status: 'inactive' },
			{ id: '7', title: 'Business Acceptance Test', status: 'inactive' },
			{ id: '8', title: 'Client Launch', status: 'inactive' }
		];
	export let onClick: (step: Step) => void;

	const statusColors = {
		completed: {
			bg: 'bg-blue-600',
			icon: 'text-white',
			border: 'border-blue-600',
			line: 'bg-blue-600',
			text: 'text-blue-600'
		},
		active: {
			bg: 'bg-white',
			icon: 'text-blue-600',
			border: 'border-blue-500',
			line: 'bg-gray-300',
			text: 'text-blue-600'
		},
		inactive: {
			bg: 'bg-white',
			icon: 'text-gray-300',
			border: 'border-gray-300',
			line: 'bg-gray-300',
			text: 'text-gray-300'
		}
	};
</script>

<div class="flex">
	{#each steps as { id, title, status }, index}
		<div class="relative flex flex-1 flex-col items-center">
			<button
				class={`${statusColors[status].bg} ${statusColors[status].border} z-10 flex h-10 w-10 items-center justify-center rounded-full border-2`}
				on:click={() => onClick({ id, title, status })}
				disabled={status === 'inactive'}
			>
				<span class={`font-medium ${statusColors[status].icon}`}>
					{#if status === 'completed'}
						<Icon icon="mdi:check" />
					{:else}
						<Icon icon="mdi:circle" />
					{/if}
				</span>
			</button>
			<div class={`mt-2 text-center text-xs font-medium ${statusColors[status].text}`}>
				{title}
			</div>
			{#if index < steps.length - 1}
				<div class={`absolute -right-1/2 top-5 h-0.5 w-full ${statusColors[status].line}`}></div>
			{/if}
		</div>
	{/each}
</div>

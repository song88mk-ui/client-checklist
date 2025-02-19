<script lang="ts">
	import Icon from '@iconify/svelte';
	import selectedIntegration from '$stores/integration';
	import IntegrationType from '$enums/integrationType';
	import Product from '../utils/client';

	const integrationTypes = Object.values(IntegrationType);

	let isShow = false;

	const toggle = () => {
		isShow = !isShow;
	};

    const selectedIntegrationType = (integration: IntegrationType) => {
        $selectedIntegration = integration
        isShow = false
    }

</script>

<div class="relative inline-block">
	<button
		class="inline-block flex flex-1 items-center items-center justify-center gap-2 rounded bg-blue-600 py-3 pl-4 pr-3 text-center text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
		onclick={toggle}
	>
		Create Client Account
		<Icon icon={`mdi:${isShow ? 'chevron-up' : 'chevron-down'}`} height={24} />
	</button>
	{#if isShow}
		<div
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="py-1" role="none">
				{#each integrationTypes as type}
					<a
						href={`/create-client`}
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						role="menuitem"
						onclick={() => selectedIntegrationType(type)}
						id="menu-item-0">{Product[type]}</a
					>
				{/each}
			</div>
		</div>
	{/if}
</div>

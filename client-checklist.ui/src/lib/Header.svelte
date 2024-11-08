<script lang="ts">
	import CompanyLogo from '$lib/CompanyLogo.svelte';
	import Icon from '@iconify/svelte';
	import Role from '$enums/role';
	import CreateClientDropdown from '$lib/CreateClientDropdown.svelte';

	const auth = {
		role: Role.ADMIN
	};

	const handleLogout = () => {
		console.log('todo');
	};
</script>

<header class="flex items-center bg-white p-5 shadow-md">
	<h1 class="mr-3">
		<a href="/">
			<CompanyLogo size={136} />
		</a>
	</h1>
	<nav class="flex flex-1 items-center justify-between">
		<div></div>
		{#if auth}
			<div class="flex items-center gap-3">
				{#if auth.role === Role.ADMIN}
					<CreateClientDropdown />
				{/if}
				<div class="flex items-center gap-3">
					<div class="flex-1 text-right text-sm">
						<div class="font-semibold capitalize text-blue-600">Janina Mencero</div>
						<div class="text-xs capitalize italic">{auth.role}</div>
					</div>
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">
						J
					</div>
				</div>
				{#if auth.role === Role.ADMIN}
					<button on:click={handleLogout}>
						<Icon icon="mdi:logout" height={24} />
					</button>
				{/if}
			</div>
		{/if}
	</nav>
</header>

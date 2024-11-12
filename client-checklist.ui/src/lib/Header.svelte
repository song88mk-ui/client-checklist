<script lang="ts">
	import CompanyLogo from '$lib/CompanyLogo.svelte';
	import Icon from '@iconify/svelte';
	import { AccessType } from '$enums/role';
	import CreateClientDropdown from '$lib/CreateClientDropdown.svelte';
	import auth from '$stores/auth';
	import { LocalStorage } from './storage';
	import APIGateway from '$api/APIGateway';

	const { logout } = APIGateway();

	const handleLogout = async () => {
		try {
			await logout({
				userToken: $auth?.userToken as string
			});

			$auth = null;
			LocalStorage.removeValue('userToken');
			LocalStorage.removeValue('accessType');
			LocalStorage.removeValue('username');
		} catch (error: unknown) {
			console.error(error);
		}
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
		{#if $auth}
			<div class="flex items-center gap-3">
				{#if AccessType.READWRITE === $auth.accessType}
					<CreateClientDropdown />
				{/if}
				<div class="flex items-center gap-3">
					<div class="flex-1 text-right text-sm">
						<div class="font-semibold capitalize text-blue-600">{$auth.username}</div>
						<div class="text-xs capitalize italic">{$auth.roleName}</div>
					</div>
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">
						J
					</div>
				</div>
				<button on:click={handleLogout}>
					<Icon icon="mdi:logout" height={24} />
				</button>
			</div>
		{/if}
	</nav>
</header>

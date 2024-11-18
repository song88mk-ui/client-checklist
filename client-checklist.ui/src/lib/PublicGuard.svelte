<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import auth from '$stores/auth';
	import { LocalStorage } from './storage';

	let isLoggedIn = false;
	$: if (browser && ($auth?.userToken || LocalStorage.getValue('userToken'))) {
		isLoggedIn = true;
		goto('/');
	}
</script>

{#if browser && !isLoggedIn}
	<slot />
{/if}

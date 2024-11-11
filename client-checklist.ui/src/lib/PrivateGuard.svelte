<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import auth from '$stores/auth';

	$: if (browser && !$auth) {
		goto('/login');
	}
</script>

{#if $auth}
	<slot />
{:else}
	<div>Authenticating...</div>
{/if}

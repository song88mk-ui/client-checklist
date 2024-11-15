<script lang="ts">
	import PublicGuard from '$lib/PublicGuard.svelte';
	let { children } = $props();
</script>

<PublicGuard>
	{@render children()}
</PublicGuard>

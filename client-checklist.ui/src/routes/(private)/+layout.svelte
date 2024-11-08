<script lang="ts">
	import Header from '$lib/Header.svelte';
	import ModalContainer from '$lib/ModalContainer.svelte';
	import PrivateGuard from '$lib/PrivateGuard.svelte';

	let { children } = $props();
</script>

<PrivateGuard>
	<Header />
	<div class="p-6">
		{@render children()}
	</div>
	<ModalContainer />
</PrivateGuard>

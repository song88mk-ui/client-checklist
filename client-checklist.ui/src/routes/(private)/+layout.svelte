<script lang="ts">
	import Header from '$lib/Header.svelte';
	import ModalContainer from '$lib/ModalContainer.svelte';
	import PrivateGuard from '$lib/PrivateGuard.svelte';

	let { children } = $props();
</script>

<PrivateGuard>
	<div class="flex h-full flex-col">
		<Header />
		<div class="p-6 flex-1">
			{@render children()}
		</div>
	</div>
	<ModalContainer />
</PrivateGuard>

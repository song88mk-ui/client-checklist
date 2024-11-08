<script lang="ts">
	import Header from '$lib/Header.svelte';
	import ModalContainer from '$lib/ModalContainer.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Header />
<ModalContainer />
{@render children()}

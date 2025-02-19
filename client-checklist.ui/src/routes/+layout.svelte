<script lang="ts">
	import '../app.css';
	import ModalContainer from '$lib/ModalContainer.svelte';
	let { children } = $props();

	console.log(`App Version: 1.5.1`);
</script>

{@render children()}
<ModalContainer />

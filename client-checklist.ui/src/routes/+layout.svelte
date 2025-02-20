<script lang="ts">
	import '../app.css';
	import ModalContainer from '$lib/ModalContainer.svelte';
	let { children } = $props();

	console.log(`App Version: 1.5.4`);
</script>

{@render children()}
<ModalContainer />

<script lang="ts">
	import '../app.css';
	import ModalContainer from '$lib/ModalContainer.svelte';
	let { children } = $props();

    console.log(`App Version: 0.0.2`);
</script>

{@render children()}
<ModalContainer />

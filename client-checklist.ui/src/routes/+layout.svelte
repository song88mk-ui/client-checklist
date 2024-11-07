<script lang="ts">
	import ModalContainer from '$lib/ModalContainer.svelte';
	import '../app.css';
    
	let { children } = $props();
</script>

<ModalContainer />
{@render children()}

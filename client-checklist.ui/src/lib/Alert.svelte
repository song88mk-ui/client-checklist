<script lang="ts">
	let { message, onClose } = $props<{
		message: string;
		onClose?: () => void;
	}>();
</script>

<div class="relative rounded bg-red-100 px-4 py-3 text-sm text-red-700" role="alert">
	<span class="block sm:inline">{message}</span>
	<button
		type="button"
		class="absolute bottom-0 right-0 top-0 p-3"
		onclick={onClose}
		aria-label="Close alert"
	>
		<img src="/icon-close-red.svg" alt="icon-close" />
	</button>
</div>

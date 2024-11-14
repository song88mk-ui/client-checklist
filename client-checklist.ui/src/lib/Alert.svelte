<script lang="ts">
	let {
		variant = 'success',
		message,
		onClose,
		hasCloseButton = true
	} = $props<{
		variant?: 'error' | 'success';
		message: string;
		onClose?: () => void;
		hasCloseButton?: boolean;
	}>();
</script>

<div
	class={`relative rounded px-4 py-3 text-sm ${variant === 'error' ? 'bg-red-100 text-red-700' : 'border border-[#49A02D] bg-green-100 text-green-700'}`}
	role="alert"
>
	<span class="block sm:inline">{message}</span>
	{#if hasCloseButton}
		<button
			type="button"
			class="absolute bottom-0 right-0 top-0 p-3"
			onclick={onClose}
			aria-label="Close alert"
		>
			<img src="/icon-close-${variant === 'error' ? 'red' : 'green'}.svg" alt="icon-close" />
		</button>
	{/if}
</div>

<script lang="ts">
	import { closeModal } from '$stores/modal';
	import { copy } from 'svelte-copy';
	import { selectedClient } from '$stores/client';
	import { page } from '$app/stores';

	const handleCancel = () => {
		closeModal();
	};

	let isCopied = false;

	const linkToShare = `${$page.url.origin}/clients/${$selectedClient?.id}?token=${$selectedClient?.clientToken}`;
</script>

<div class="flex w-full max-w-[440px] flex-col justify-center gap-3 rounded-[12px] bg-white p-6">
	<div class="flex flex-row items-center justify-between">
		<h1 class="text-[18px] font-bold">Share read-only Link</h1>
		<button class="-mr-2 cursor-pointer p-2" on:click={handleCancel}>
			<img src="/icon-close.svg" alt="icon-close" class="h-[9px]" />
		</button>
	</div>

	<div class="flex w-full flex-row gap-[12px]">
		<input
			type="text"
			class="flex-1 rounded border p-2 text-xs font-semibold"
			value={linkToShare}
			readonly
		/>
		<button
			type="button"
			class="w-[111px] cursor-pointer rounded border border-solid border-transparent bg-slate-800 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[#2DBE22]"
			disabled={isCopied}
			use:copy={{
				text: linkToShare,
				events: ['click'],
				onCopy({ text, event }) {
					isCopied = true;
				}
			}}
		>
			{isCopied ? 'Copied' : 'Copy'}
		</button>
	</div>
</div>

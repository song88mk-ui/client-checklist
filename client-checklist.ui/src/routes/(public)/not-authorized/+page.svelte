<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex h-full flex-1 flex-col items-center justify-center">
	<div class="max-w-lg text-center">
		<h1 class="mb-3 text-3xl font-bold">Not Authorized</h1>
		<div class="mb-7">
			Sorry, you are not authorized to access this page. Please contact your administrator if you
			believe this is a mistake.
		</div>
		<div>
			<a
				href="/"
				class="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
			>
				<Icon icon="mdi:chevron-left" height={24} /> Back to Home
			</a>
		</div>
	</div>
</div>

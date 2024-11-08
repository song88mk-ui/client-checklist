<script lang="ts">
	import ClientInformationForm from '$lib/ClientInformationForm.svelte';
	import GenerateLinkButton from '$lib/GenerateLinkButton.svelte';
	import ProgressStepper from '$lib/ProgressStepper.svelte';
	import type Step from '$types/step';

	const handleStepClick = (step: Step) => {
		// Todo
		console.log(step);
	};
</script>

<div class="mb-10 flex items-center justify-between">
	<h1 class="text-3xl font-bold">Odds Feed and Live Data Integration</h1>
	<GenerateLinkButton />
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStepper
		steps={[
			{ id: '1', title: 'Contact Information', status: 'completed' },
			{ id: '2', title: 'Back Office', status: 'active' },
			{ id: '3', title: 'Wallet Integration', status: 'inactive' },
			{ id: '4', title: 'Sportsbook Player Site UI/UX', status: 'inactive' },
			{ id: '5', title: 'Manage Trading Services', status: 'inactive' },
			{ id: '6', title: 'Operations', status: 'inactive' },
			{ id: '7', title: 'Business Acceptance Test', status: 'inactive' },
			{ id: '8', title: 'Client Launch', status: 'inactive' }
		]}
		onClick={handleStepClick}
	/>
</div>
<div class="mb-10">
	<ClientInformationForm />
</div>
<div class="text-right">
	<div class="inline-flex gap-2">
		<button
			class="h-[40px] w-24 rounded-md border-2 border-slate-800 bg-white px-5 py-2 leading-none"
			>Back</button
		>
		<button class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white">Next</button>
	</div>
</div>

<script lang="ts">
	import ClientInformationForm from '$lib/ClientInformationForm.svelte';
	import GenerateLinkButton from '$lib/GenerateLinkButton.svelte';
	import ProgressStepper from '$lib/ProgressStepper.svelte';
	import type Step from '$types/step';
    import selectedIntegration from '$stores/integration'
	import Product from '../../../utils/client';

	const handleStepClick = (step: Step) => {
		// Todo
		console.log(step);
	};
</script>

<div class="mb-10 flex items-center justify-between">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
	<GenerateLinkButton />
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStepper onClick={handleStepClick} />
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

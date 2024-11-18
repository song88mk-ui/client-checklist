<script lang="ts">
	import ClientInformationForm from '$lib/ClientInformationForm.svelte'
	import ProgressStep from '$lib/ProgressStep/ProgressStep.svelte'
    import selectedIntegration from '$stores/integration'
	import Product from '../../../utils/client'

    let step = $state(0)

    const back = () => {
        if (step > 0) {
            step--
        }
    }

    const next = () => {
           step++
    }
</script>

<div class="mb-10 flex items-center justify-between">
	<h1 class="text-3xl font-bold">{Product[$selectedIntegration]}</h1>
</div>
<div class="mx-auto mb-10 max-w-screen-lg">
	<ProgressStep bind:step={step} />
</div>
<div class="mb-10">
	<ClientInformationForm />
</div>
<div class="text-right">
	<div class="inline-flex gap-2">
		<button
			class="h-[40px] w-24 rounded-md border-2 border-slate-800 bg-white px-5 py-2 leading-none"
            onclick={back}
			>Back</button
		>
		<button class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
            onclick={next}
        >Next</button>
	</div>
</div>

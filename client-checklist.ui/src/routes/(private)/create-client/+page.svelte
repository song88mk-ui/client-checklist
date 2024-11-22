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
	<ClientInformationForm back={back} next={next}/>
</div>


<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import validationSchema, { type ProductFormType } from './validationSchema';
	import ClientTask from './ClientTask.svelte';
	import Environment from '$enums/Environment';
	import Alert from '../Alert.svelte';
	import hasValue from '$utils/hasValue';

	let { title, initialValues, back, isLoading, onSubmit,step } = $props<{
		title: string;
		initialValues: ProductFormType;
		back?: () => void;
		step?: () => number;
		isLoading?: boolean;
		onSubmit: (values: ProductFormType) => void;
	}>();

	let errorMsg = $state('')
	const { form, errors, updateField, handleSubmit } = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});
	$effect(()=>{
		if(hasValue($errors)){
			errorMsg = "Please fill all the fields correctly."
		}
	})

</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-7">
    {#if hasValue($errors)}
        <div class="mb-5">
            <Alert variant="error" message={errorMsg} hasCloseButton={false} />
        </div>
    {/if}
	<ClientTask
		title={`${title} (${Environment.STAGING})`}
		name={Environment.STAGING}
		clientTask={$form[Environment.STAGING]}
		errors={$errors[Environment.STAGING]}
		{updateField}
	/>

	<ClientTask
		title={`${title} (${Environment.PRODUCTION})`}
		name={Environment.PRODUCTION}
		clientTask={$form[Environment.PRODUCTION]}
		errors={$errors[Environment.PRODUCTION]}
		{updateField}
	/>
	<div class="text-right">
		<div class="inline-flex gap-2">
			<button
				type="button"
				class="h-[40px] w-24 rounded-md border-2 border-slate-800 bg-white px-5 py-2 leading-none"
				disabled={isLoading}
				onclick={back}>Back</button
			>
			<button
				onclick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				disabled={isLoading}>{step ? 'Create': 'Next'}</button
			>
		</div>
	</div>
</form>

<script lang="ts">
	import Environment from '$enums/Environment';
	import hasValue from '$utils/hasValue';
	import { createForm } from 'svelte-forms-lib';
	import Alert from '../Alert.svelte';
	import ClientTask from './ClientTask.svelte';
	import validationSchema, { type ProductFormType } from './validationSchema';

	let { title, initialValues, back, isLoading, onSubmit, finishFormButtonLabel, disabled = false } = $props<{
		title: string;
		initialValues: ProductFormType;
		back?: () => void;
		isLoading?: boolean;
		onSubmit: (values: ProductFormType) => void;
        finishFormButtonLabel: string;
		disabled?: boolean;
	}>();

	let errorMsg = $state('');

	const { form, errors, updateField, handleSubmit } = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});

	$effect(() => {
		if (hasValue($errors)) {
			errorMsg = 'Please fill all the fields correctly.';
		}
	});
</script>

<form onsubmit={handleSubmit} class="cc-product-form flex flex-col gap-7">
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
		{disabled}
	/>

	<ClientTask
		title={`${title} (${Environment.PRODUCTION})`}
		name={Environment.PRODUCTION}
		clientTask={$form[Environment.PRODUCTION]}
		errors={$errors[Environment.PRODUCTION]}
		{disabled}
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
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				disabled={isLoading}>{finishFormButtonLabel}</button
			>
		</div>
	</div>
</form>

<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import validationSchema, { type ProductFormType } from './validationSchema';
	import ClientTask from './ClientTask.svelte';
	import Environment from '$enums/Environment';

	let { title, initialValues, back, onSubmit } = $props<{
		title: string;
		initialValues: ProductFormType;
		back?: () => void;
		onSubmit: (values: ProductFormType) => void;
	}>();

	const { form, errors, updateField, handleSubmit } = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-7">
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
				onclick={back}>Back</button
			>
			<button class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				>Next</button
			>
		</div>
	</div>
</form>

<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { createValidationSchema, type ProductFormType } from './validationSchema';
	import ClientTask from './ClientTask.svelte';
	import Environment from '$enums/Environment';
	import Alert from '../Alert.svelte';
	import hasValue from '$utils/hasValue';

	let { initialValues, back, isLoading, onSubmit, finishFormButtonLabel, step, disabled = false } = $props<{
		title: string;
		initialValues: ProductFormType;
		onSubmit: (values: ProductFormType) => void;
        finishFormButtonLabel: string;
		back?: () => void;
		step?: () => number;
		isLoading?: boolean;
		disabled?: boolean;
	}>();
	let errorMsg = $state('')
	const { form, errors, updateField, handleSubmit } = createForm({
		initialValues,
		validationSchema: createValidationSchema('production'),
		onSubmit
	});
	const TASKS:any = {
		8:[
			{title:"Client Launch",name:Environment.PRODUCTION,
			clientTask:$form[Environment.PRODUCTION],errors:$errors[Environment.PRODUCTION]},		
		],
		7:[
			{title:"Bet Validation",name:Environment.STAGING,
			clientTask:$form[Environment.STAGING],errors:$errors[Environment.STAGING]},
			{title:"Odds Feed  / Live Data",name:Environment.PRODUCTION,
			clientTask:$form[Environment.PRODUCTION],errors:$errors[Environment.PRODUCTION]},
		],
		6:[
			{title:"Business Acceptance Test",name:Environment.PRODUCTION,
			clientTask:$form[Environment.PRODUCTION],errors:$errors[Environment.PRODUCTION]},		
		],
		4:[
			{title:"End to End Testing: Function / Performance",name:Environment.PRODUCTION,
			clientTask:$form[Environment.PRODUCTION],errors:$errors[Environment.PRODUCTION]},		
		]
	}
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
	{#each TASKS[step] as task}
		<ClientTask
			title={task.title}
			name={task.name}
			clientTask={task.clientTask}
			errors={task.errors}
			{updateField}
			{disabled}
		/>
	{/each}

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
				disabled={isLoading}>{finishFormButtonLabel}</button
			>
		</div>
	</div>
</form>

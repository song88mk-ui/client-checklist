<script lang="ts">
	import hasValue from '$utils/hasValue';
	import { createForm } from 'svelte-forms-lib';
	import Alert from '../Alert.svelte';
	import ClientTask from './ClientTask.svelte';
	import { createValidationSchema, type ProductFormType } from './validationSchema';
	import IntegrationType from '$enums/integrationType';
	import { isFormModified } from '$stores/form';

	let {
		title,
		initialValues,
		back,
		isLoading,
		onSubmit,
		finishFormButtonLabel,
		disabled = false,
		isLaunch = false,
		serviceType = IntegrationType.WALLET_INTEGRATION,
		dataKeys = ['staging', 'production']
	} = $props<{
		title: string;
		initialValues: ProductFormType;
		back?: () => void;
		isLoading?: boolean;
		onSubmit: (values: ProductFormType) => void;
		finishFormButtonLabel: string;
		disabled?: boolean;
		isLaunch?: boolean;
		dataKeys?: string[];
		serviceType?: string;
	}>();

	let errorMsg = $state('');
	const keys =
		isLaunch && serviceType == IntegrationType.WALLET_INTEGRATION ? ['production'] : dataKeys;
	const schema = createValidationSchema(keys);

	// TODO: Need to make the initial values pair with validation schema
	// let { initialValues, validationSchema } = pageForm;

	const { form, isModified, errors, updateField, handleSubmit } = createForm({
		initialValues,
		validationSchema: schema,
		onSubmit
	});

	$effect(() => {
		$isFormModified = $isModified;
	})

	$effect(() => {
		if (hasValue($errors)) {
			errorMsg = 'Please fill all the fields correctly.';
		}
	});

	// TODO: Need to refactor to make it clean and reusable
	const getStepTitle = (key: string) => {
		return key === 'staging' && isLaunch && serviceType === IntegrationType.FEED_INTEGRATION
			? 'Bet Validation'
			: `${title} (${key})`;
	};
</script>

<form onsubmit={handleSubmit} class="cc-product-form flex flex-col gap-7">
	{#if hasValue($errors)}
		<div class="mb-5">
			<Alert variant="error" message={errorMsg} hasCloseButton={false} />
		</div>
	{/if}

	{#each keys as key}
		<ClientTask
			title={getStepTitle(key)}
			name={key}
			clientTask={$form[key]}
			errors={$errors[key]}
			{disabled}
			{updateField}
		/>
	{/each}

	<div class="text-right">
		<div class="inline-flex gap-2">
			<button
				type="button"
				class="h-[40px] w-24 rounded-md border-2 border-slate-800 bg-white px-5 py-2 leading-none"
				disabled={isLoading}
				onclick={back}
				>Back
			</button>
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="w-24 rounded-md border-slate-800 bg-slate-800 px-5 py-2 text-white"
				disabled={isLoading}>{finishFormButtonLabel}</button
			>
		</div>
	</div>
</form>

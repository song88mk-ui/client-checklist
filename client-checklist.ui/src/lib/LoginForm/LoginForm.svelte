<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { type LoginFormType } from './validationSchema';
	import validationSchema from './validationSchema';
	import Icon from '@iconify/svelte';

	let showPassword = false;

	export let error = '';

	export let onSubmit: (values: LoginFormType) => void;

	export let isLoading = false;

	export const initialValues: LoginFormType = {
		username: '',
		password: '',
		rememberMe: false
	};

	const handleRemoveError = () => {
		error = '';
	};

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema,
		onSubmit
	});

	const togglePassword = () => {
		showPassword = !showPassword;
	};
</script>

<div class="mx-auto flex w-[442px] flex-col gap-4 rounded-md border bg-white p-6 shadow">
	<div class="flex justify-center">
		<img src="/logo.svg" width="200" alt="logo" />
	</div>

	<form on:submit={handleSubmit} class="flex flex-col gap-4">
		<div>
			<div class="relative flex w-full items-center rounded border">
				<img src="/person.svg" alt="person" class="absolute ml-2 text-blue-600" />
				<input
					name="username"
					placeholder="Enter Username"
					class="block w-full py-3 pl-10 pr-3 text-sm"
					on:change={handleChange}
					bind:value={$form.username}
				/>
			</div>
			{#if $errors.username}
				<small class="text-red-500">{$errors.username}</small>
			{/if}
		</div>

		<div>
			<div class="relative flex w-full items-center rounded border">
				<img src="/lock.svg" alt="lock" class="absolute ml-2 text-blue-600" />
				<input
					name="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter Password"
					class="block w-full px-10 py-3 text-sm"
					on:change={handleChange}
				/>
				<div on:click={togglePassword} role="presentation" class="cursor-pointer">
					<Icon
						icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
						class="absolute right-0 top-0 mx-2 my-3 text-blue-600"
						height={22}
					/>
				</div>
			</div>
			{#if $errors.password}
				<small class="text-red-500">{$errors.password}</small>
			{/if}
		</div>

		<label class="flex cursor-pointer items-center">
			<input
				type="checkbox"
				bind:checked={$form.rememberMe}
				on:click={() => ($form.rememberMe = !$form.rememberMe)}
			/>
			<small class="ml-2 font-semibold text-slate-500">Remember Me</small>
		</label>

		{#if error}
			<div class="relative rounded bg-red-100 px-4 py-3 text-sm text-red-700" role="alert">
				<span class="block sm:inline">{error}</span>
				<button
					type="button"
					class="absolute bottom-0 right-0 top-0 p-3"
					on:click={handleRemoveError}
					aria-label="Close alert"
				>
					<Icon icon="mdi:close" height={22} class="fill-current text-red-500" />
				</button>
			</div>
		{/if}

		<button
			type="submit"
			class="flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-blue-400"
			disabled={isLoading}
		>
			{#if isLoading}
				<Icon icon="mdi:loading" class="animate-spin" height={20} />
			{:else}
				Login
			{/if}
		</button>
	</form>
</div>

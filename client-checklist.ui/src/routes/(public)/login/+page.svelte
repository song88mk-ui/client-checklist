<script lang="ts">
	import { goto } from '$app/navigation';
	import Role, { AccessTypeAPIResponse } from '$enums/role';
	import Button from '$lib/Button.svelte';
	import { LocalStorage } from '$lib/storage';
	import auth from '$stores/auth';
	import APIGateway from '../../../api/APIGateway';
	import { ResponseMessage, type LoginResponse } from '../../../api/models';
	let username = '';
	let password = '';
	let error = '';
	let rememberMe = false;
	let showPassword = false;

	const { login } = APIGateway();

	const togglePassword = () => {
		showPassword = !showPassword;
	};

	// TODO
	const handleSubmit = async (e: any): Promise<void> => {
		e.preventDefault();

		const res: any = await login({ username, password });
        const isCatchExceptionError: boolean = res?.error !== undefined && res?.error !== null;
        const isValidationError: boolean = !isCatchExceptionError && (res?.data === undefined || res?.data === null);

		if (isCatchExceptionError) {
			// todo catch exception error handling
            console.log("catch exception error");
			return;
		}

        if (isValidationError) {
            // todo validation error handling
            console.log("validation error");
            return;
        }

		if (res?.data !== undefined && res?.error !== null) {
			const authToken: string = res.data.userToken;
			if (rememberMe) {
				LocalStorage.setValue('authenticationToken', authToken);
			}

			$auth = { username, password, role: res.data.roleName, accessType: res.data.accessType };

            goto('/');
		}
	};

	const getAuthenticationToken = () => {
		return LocalStorage.getValue('authenticationToken');
	};
</script>

<div class="h-[100svh] flex-1 content-center">
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
						type="text"
						placeholder="Enter Username"
						class="block w-full py-3 pl-10 pr-3 text-sm"
						bind:value={username}
					/>
				</div>
				<!-- {#if $errors.username}
        <small class="text-red-500">{$errors.username}</small>
      {/if} -->
			</div>

			<div>
				<div class="relative flex w-full items-center rounded border">
					<img src="/lock.svg" alt="lock" class="absolute ml-2 text-blue-600" />
					<input
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Enter Password"
						class="block w-full px-10 py-3 text-sm"
						bind:value={password}
					/>
					<div on:click={togglePassword} role="presentation" class="cursor-pointer">
						<!-- <Icon
            icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
            class="absolute mx-2 my-3 text-blue-600 right-0 top-0"
            height={22}
          /> -->
					</div>
				</div>
				<!-- {#if $errors.password}
        <small class="text-red-500">{$errors.password}</small>
      {/if} -->
			</div>

			<label class="flex cursor-pointer items-center">
				<input type="checkbox" bind:checked={rememberMe} />
				<small class="ml-2 font-semibold text-slate-500">Remember Me</small>
			</label>

			{#if error}
				<div class="relative rounded bg-red-100 px-4 py-3 text-sm text-red-700" role="alert">
					<span class="block sm:inline">{'error'}</span>
					<Button
						type="button"
						classNames="absolute top-0 bottom-0 right-0 p-3"
						ariaLabel="Close alert"
						click={() => {}}>Testing</Button
					>
				</div>
			{/if}

			<Button
				type="submit"
				classNames="w-full bg-blue-600 hover:bg-blue-800 text-sm text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center disabled:bg-blue-400"
			>
				Login
			</Button>
		</form>
	</div>
</div>

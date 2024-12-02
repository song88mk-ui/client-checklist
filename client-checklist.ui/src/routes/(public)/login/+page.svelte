<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/LoginForm/LoginForm.svelte';
	import { LocalStorage } from '$lib/storage';
	import type { LoginFormType } from '$lib/LoginForm/validationSchema';
	import APIGateway from '$api/APIGateway';
	import auth from '$stores/auth';
	import { FetchStatus } from '$api/models';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import AuthService from '$services/AuthService';

	let initialValues = { username: '', password: '', rememberMe: false };

	let error = '';
	let isLoading = false;

	const { login } = AuthService;

	const handleSubmit = async (values: LoginFormType): Promise<void> => {
		const { username, password, rememberMe } = values;
		isLoading = true;
		const response: any = await login(username, password, rememberMe);

		if (response?.error) {
			isLoading = false;

			switch (response.error.status) {
				case FetchStatus.BadRequest:
					error = ErrorMessages.LoginIncorrectUsernamePassword;
					break;
				case FetchStatus.ServerError:
					error = ErrorMessages.LoginFailed;
					break;
				default:
					break;
			}
			return;
		}

		goto('/');
	};

	const handleRemoveError = () => {
		error = '';
	};
</script>

<div class="h-[100svh] flex-1 content-center">
	<LoginForm
		{initialValues}
		{error}
		{isLoading}
		onRemoveError={handleRemoveError}
		onSubmit={handleSubmit}
	/>
</div>

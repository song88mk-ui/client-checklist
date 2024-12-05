<script lang="ts">
	import { FetchErrorStatus } from '$api/models';
	import { goto } from '$app/navigation';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import LoginForm from '$lib/LoginForm/LoginForm.svelte';
	import type { LoginFormType } from '$lib/LoginForm/validationSchema';
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
				case FetchErrorStatus.BadRequest:
					error = ErrorMessages.LoginIncorrectUsernamePassword;
					break;
				case FetchErrorStatus.ServerError:
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

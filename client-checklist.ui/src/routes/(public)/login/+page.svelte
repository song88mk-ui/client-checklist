<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/LoginForm/LoginForm.svelte';
	import { LocalStorage } from '$lib/storage';
	import auth from '$stores/auth';
	import APIGateway from '$api/APIGateway';
	import type { LoginFormType } from '$lib/LoginForm/validationSchema';

	let initialValues = { username: '', password: '', rememberMe: false };

	const { login } = APIGateway();

	let error = '';
	let isLoading = false;

	const handleSubmit = async (values: LoginFormType): Promise<void> => {
		const { username, password, rememberMe } = values;
		isLoading = true;
		const response: any = await login({ username, password });

		if (response?.error) {
			isLoading = false;
			error = response.error.toString();
			return;
		}

		const authToken: string = response.data.userToken;

		if (rememberMe) {
			LocalStorage.setValue('authenticationToken', authToken);
		}

		$auth = {
			username,
			password,
			role: response.data.roleName,
			accessType: response.data.accessType
		};

		goto('/');
	};
</script>

<div class="h-[100svh] flex-1 content-center">
	<LoginForm {initialValues} {error} {isLoading} onSubmit={handleSubmit} />
</div>

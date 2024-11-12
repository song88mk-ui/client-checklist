<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/LoginForm/LoginForm.svelte';
	import { LocalStorage } from '$lib/storage';
	import type { LoginFormType } from '$lib/LoginForm/validationSchema';
	import APIGateway from '$api/APIGateway';
	import auth from '$stores/auth';
	import {getErrorMessage} from '../../../utils';

	let initialValues = { username: '', password: '', rememberMe: false };

	const { login } = APIGateway();

	let error = '';
	let isLoading = false;

	const handleSubmit = async (values: LoginFormType): Promise<void> => {
		const { username, password, rememberMe } = values;
		isLoading = true;
		const response: any = await login({ username, password });

		if (!response?.data) {
			isLoading = false;
			error = getErrorMessage(response?.message);
			return;
		}



		const { userToken, roleName, accessType } = response.data;

		$auth = {
			username: values.username,
			userToken,
			roleName,
			accessType
		};

		if (rememberMe) {
			LocalStorage.setValue('userToken', JSON.stringify(userToken));
            LocalStorage.setValue('accessType', JSON.stringify(accessType));
            LocalStorage.setValue('username', JSON.stringify(username));
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

import { LocalStorage } from '$lib/storage';
import APIGateway from '$api/APIGateway';
import auth from '$stores/auth';

const { logout: logoutAPI, login: loginAPI } = APIGateway();

const removeAuth = () => {
	auth.set(null);
	LocalStorage.removeValue('userToken');
	LocalStorage.removeValue('accessType');
	LocalStorage.removeValue('username');
};

const logout = async (userToken: string) => {
	const response = await logoutAPI(
		{
			userToken
		},
		{
			'x-user-token': userToken
		}
	);

	if (!response?.error) {
		removeAuth();
	}

	return response;
};

const login = async (username: string, password: string, rememberMe: boolean) => {
	const response = await loginAPI({
		username,
		password
	});

	const { userToken, roleName, accessType } = response.data;

	auth.set({
		username,
		userToken,
		roleName,
		accessType
	});

	if (rememberMe) {
		LocalStorage.setValue('userToken', JSON.stringify(userToken));
		LocalStorage.setValue('accessType', JSON.stringify(accessType));
		LocalStorage.setValue('username', JSON.stringify(username));
	}

	return response;
};

const AuthService = { removeAuth, logout, login };

export default AuthService;

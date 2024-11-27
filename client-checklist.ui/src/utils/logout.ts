import APIGateway from '$api/APIGateway';
import { LocalStorage } from '$lib/storage';
import auth from '$stores/auth';

const { logout: logoutAPI } = APIGateway();

export const logout = async (userToken: string) => {
	const response = await logoutAPI(
		{
			userToken
		},
		{
			'x-user-token': userToken
		}
	);

	if (!response?.error) {
		auth.set(null);
		LocalStorage.removeValue('userToken');
		LocalStorage.removeValue('accessType');
		LocalStorage.removeValue('username');
	}

	return response;
};

export default logout;

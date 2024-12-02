import APIGateway from '$api/APIGateway';
import removeAuth from './removeAuth';

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
		removeAuth();
	}

	return response;
};

export default logout;

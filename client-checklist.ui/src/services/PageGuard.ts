import { goto } from '$app/navigation';
import AuthService from '$services/AuthService';
import { StatusCode } from '$api/models';

export const PageGuard = async (statusCode: StatusCode) => {
	if (statusCode === StatusCode.UnAuthorized) {
		AuthService.removeAuth();
		await goto('/login');
	}
};
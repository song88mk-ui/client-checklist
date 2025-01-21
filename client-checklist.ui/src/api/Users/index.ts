import type { LoginPayload, LogoutPayload } from '$api/request.DTO.model';
import type { APIResponse } from '$api/models';
import type { LoginAPIResponse, LogoutAPIResponse } from '$api/response.DTO.model';
import BaseAPIService from '$api/BaseAPIService';

const { fetchPrivate } = BaseAPIService();

const login = async (payload: LoginPayload): Promise<APIResponse<LoginAPIResponse>> => {
	const res = await fetchPrivate<LoginPayload, LoginAPIResponse>(
		'POST',
		'/v1/users/login',
		payload
	);
	return res;
}

const logout = async (payload: LogoutPayload): Promise<APIResponse<LogoutAPIResponse>> => {
	const res = await fetchPrivate<LogoutPayload, LogoutAPIResponse>(
		'POST',
		'/v1/users/logout',
		payload
	);
	return res;
}

const Users = {
	login,
	logout
}

export default Users
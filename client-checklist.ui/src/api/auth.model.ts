import type Role from '$enums/role';
import type { APIResponse } from './models';

export type LoginFormDataType = {
	username: string;
	password: string;
};

export type LoginAPIResponse = APIResponse & {
	data: { userToken: string; roleName: Role; accessType: number };
};

export type LoginEndpointWithBody = (
	data: LoginFormDataType,
	headers?: Record<string, string>
) => Promise<LoginAPIResponse>;

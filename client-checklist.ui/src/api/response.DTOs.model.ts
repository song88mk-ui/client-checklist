import type Role from "$enums/role";

export type LoginAPIResponse = {
	data: { userToken: string; roleName: Role; accessType: number };
};
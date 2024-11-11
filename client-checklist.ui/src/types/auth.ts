import type { AccessType } from '$enums/role';
import type Role from '$enums/role';

type Auth = {
	username: string;
	userToken: string;
	roleName: Role;
	accessType: AccessType;
};

export type { Auth as default };

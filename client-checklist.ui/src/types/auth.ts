import type { AccessType } from '$enums/role';
import type Role from '$enums/role';

type Auth = {
	username: string;
	password: string;
	role: Role;
	accessType: AccessType;
};

export type { Auth as default };

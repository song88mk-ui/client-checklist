import type Role from '$enums/role';

type Auth = {
	username: string;
	password: string;
	role: Role.ADMIN | Role.SUPER_ADMIN;
};

export type { Auth as default };

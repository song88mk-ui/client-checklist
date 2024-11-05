import type Role from "./role";

type Auth = {
  fullName: string;
  email: string;
  role: Role;
};

export type { Auth as default };

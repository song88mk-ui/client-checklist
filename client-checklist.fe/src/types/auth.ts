import type AccessType from "./accessType";
import type Role from "./role";

type Auth = {
  accessType: AccessType;
  userToken: string;
  role: Role;
};

export type { Auth as default };

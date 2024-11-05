import AccessType from "../enums/accessType";
import Role from "../enums/role";

type Auth = {
  accessType: AccessType;
  userToken: string;
  role: Role;
};

export type { Auth as default };

import { User, UserFromAPI } from "@/models/user.model";

export const createAppUserFromResponseUser = (responseUser: UserFromAPI): User => {
  return {
    id: responseUser.idUser,
    username: responseUser.username,
    email: responseUser.email,
    roles: responseUser.roles,
  };
};

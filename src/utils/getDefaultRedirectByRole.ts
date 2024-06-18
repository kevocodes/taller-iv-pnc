import {
  DEFAULT_REDIRECT,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/constants/routes";
import { Role, RoleEnum } from "@/models/user.model";

export default function getDefaultRedirectByRole(
  role: Role[] | null | undefined
) {
  // If the user is not logged in, redirect to the login page
  if (!role) return PUBLIC_ROUTES.LOGIN;

  // If the user is banned
  if (role.length === 0) return PRIVATE_ROUTES.BANNED_USERS;

  // If the user is admin
  if (role.some((r) => r.name === RoleEnum.ADMIN)) {
    return DEFAULT_REDIRECT.ADMIN;
  }

  // If the user is doctor
  if (role.some((r) => r.name === RoleEnum.DOCTOR)) {
    return DEFAULT_REDIRECT.DOCTOR;
  }

  // If the user is assistant
  if (role.some((r) => r.name === RoleEnum.ASSISTANT)) {
    return DEFAULT_REDIRECT.ASSISTANT;
  }

  // If the user is patient
  if (role.some((r) => r.name === RoleEnum.PATIENT)) {
    return DEFAULT_REDIRECT.PATIENT;
  }

  // If the user is a regular user
  return DEFAULT_REDIRECT.USER;
}

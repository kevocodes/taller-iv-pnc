import { DEFAULT_REDIRECT, PUBLIC_ROUTES } from "@/constants/routes";
import { Role, RoleEnum } from "@/models/user.model";

export default function getDefaultRedirectByRole(
  role: Role[] | null | undefined
) {
  if (!role) return PUBLIC_ROUTES.LOGIN;

  if (role.some((r) => r.name === RoleEnum.ADMIN)) {
    return DEFAULT_REDIRECT.ADMIN;
  }

  if (role.some((r) => r.name === RoleEnum.DOCTOR)) {
    return DEFAULT_REDIRECT.DOCTOR;
  }

  if (role.some((r) => r.name === RoleEnum.ASSISTANT)) {
    return DEFAULT_REDIRECT.ASSISTANT;
  }

  if (role.some((r) => r.name === RoleEnum.PATIENT)) {
    return DEFAULT_REDIRECT.PATIENT;
  }

  return DEFAULT_REDIRECT.USER;
}
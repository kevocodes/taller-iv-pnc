import { Role, RoleEnum } from "@/models/user.model";

export const API_ROLES: Role[] = [
  {
    id: "USER",
    name: RoleEnum.USER
  },
  {
    id: "DCTR",
    name: RoleEnum.DOCTOR
  },
  {
    id: "ASST",
    name: RoleEnum.ASSISTANT
  },
  {
    id: "SUDO",
    name: RoleEnum.ADMIN
  },
  {
    id: "PATN",
    name: RoleEnum.PATIENT
  },
]
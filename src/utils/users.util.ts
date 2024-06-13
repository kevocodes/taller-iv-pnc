import { RoleEnum } from "@/models/user.model";

export const translateUserRole = (role: string) => {
  switch (role) {
    case RoleEnum.ADMIN:
      return "Administrador";
    case RoleEnum.USER:
      return "Usuario";
    case RoleEnum.ASSISTANT:
      return "Asistente";
    case RoleEnum.DOCTOR:
      return "Doctor";
    case RoleEnum.PATIENT:
      return "Paciente";
    default:
  }
};
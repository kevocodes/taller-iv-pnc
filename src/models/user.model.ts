export interface User {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

export interface UserFromAPI {
  idUser: string;
  username: string;
  email: string;
  roles: Role[];
}

export interface Role {
  id: string;
  name: RoleEnum;
} 

export enum RoleEnum {
  USER = "user",
  DOCTOR = "doctor",
  ASSISTANT = "assistant",
  ADMIN = "sysadmin",
  PATIENT = "patient",
}
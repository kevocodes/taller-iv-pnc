import { ResponseError } from "../models/ResponseError.model";
import { UserFromAPI } from "@/models/user.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (token: string): Promise<UserFromAPI[]> => {
  const response = await fetch(`${BASE_URL}/users/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Error al obtener los usuarios", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const getPatients = async (token: string): Promise<UserFromAPI[]> => {
  const response = await fetch(`${BASE_URL}/users/patients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Error al obtener los pacientes", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const getDoctors = async (token: string): Promise<UserFromAPI[]> => {
  const response = await fetch(`${BASE_URL}/users/doctors`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Error al obtener los doctores", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const getUserById = async (
  userId: string,
  token: string
): Promise<UserFromAPI> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("Usuario no encontrado", response.status);
    throw new ResponseError("Error al obtener el usuario", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const updateUserRole = async (
  userId: string,
  roles: string[],
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/config/user-role`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roles, identifier: userId }),
  });

  if (!response.ok) {
    throw new ResponseError("Error al actualizar los roles", response.status);
  }

  return "Roles actualizados correctamente";
};
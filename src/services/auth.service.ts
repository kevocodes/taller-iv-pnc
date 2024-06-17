import { z } from "zod";
import { ResponseError } from "../models/ResponseError.model";
import { loginSchema } from "@/schemas/login.schema";
import { LoginResponse } from "@/models/auth.model";
import { UserFromAPI } from "@/models/user.model";
import { createUserSchema } from "@/schemas/register.schema";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signIn = async (
  loginData: z.infer<typeof loginSchema>
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Credenciales incorrectas", response.status);
    }

    throw new ResponseError("Error al iniciar sesión", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const signUp = async (
  registerData: z.infer<typeof createUserSchema>
) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new ResponseError("Usuario ya existe", response.status);
    }

    throw new ResponseError("Error al crear cuenta", response.status);
  }

  return "Usuario creado exitosamente";
};

export const validateSession = async (token: string): Promise<UserFromAPI> => {
  const response = await fetch(`${BASE_URL}/users/whoami`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Sesión no válida", response.status);
  }

  const { data } = await response.json();

  return data;
};

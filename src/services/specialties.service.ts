import { Specialty } from "@/models/specialty.model";
import { ResponseError } from "../models/ResponseError.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getSpecialties = async (token: string): Promise<Specialty[]> => {
  const response = await fetch(`${BASE_URL}/specialty/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Error al obtener las especialidades", response.status);
  }

  const { data } = await response.json();

  return data;
}
import { ResponseError } from "../models/ResponseError.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getPatientPrescriptions = async (
  userId: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/clinic/prescriptions/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError(
      "Error al obtener las prescripciones del paciente",
      response.status
    );
  }

  const { data } = await response.json();

  return data;
};

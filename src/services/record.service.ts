import { Record } from "@/models/record.model";
import { ResponseError } from "../models/ResponseError.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createRecord = async (
  token: string,
  identifier: string,
  reason: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/users/record`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      reason,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Usuario no encontrado", response.status);
    }

    if (response.status === 400) {
      throw new ResponseError("El usuario no es un paciente", response.status);
    }

    throw new ResponseError(
      "Error al crear la entrada al historial",
      response.status
    );
  }

  return "Entrada al historial creada exitosamente";
};

export const getRecords = async (
  token: string,
  startDate?: string,
  endDate?: string
): Promise<Record[]> => {
  const query = new URLSearchParams();

  if (startDate) {
    query.append("startDate", startDate);
  }

  if (endDate) {
    query.append("endDate", endDate);
  }

  const response = await fetch(`${BASE_URL}/users/record?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new ResponseError(
        "La fecha de inicio no puede ser mayor a la fecha de fin",
        response.status
      );
    }
    throw new ResponseError(
      "Error al obtener el historial médico",
      response.status
    );
  }

  const { data } = await response.json();

  return data;
};

export const getRecordsByPatient = async (
  patientId: string,
  token: string,
): Promise<Record[]> => {
  const response = await fetch(
    `${BASE_URL}/users/record/${patientId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError("Usuario no encontrado", response.status);
    }

    throw new ResponseError(
      "Error al obtener el historial médico del paciente",
      response.status
    );
  }

  const { data } = await response.json();

  return data;
}
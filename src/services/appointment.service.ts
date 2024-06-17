import { z } from "zod";
import { ResponseError } from "../models/ResponseError.model";
import {
  approveAppointmentSchema,
  createAppointmentSchema,
} from "@/schemas/appointment.schema";
import {
  Appointment,
  AppointmentDetails,
  AppointmentOwn,
} from "@/models/appointment.model";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_URL;

export const requestAppointment = async (
  data: z.infer<typeof createAppointmentSchema>,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/appointment/request`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ResponseError("Error al solicitar la cita", response.status);
  }

  return "Cita solicitada exitosamente";
};

export const approveAppointment = async (
  appointment: Appointment,
  appointmentDetails: AppointmentDetails[],
  data: z.infer<typeof approveAppointmentSchema>,
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/appointment/approve`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idAppointment: appointment.idAppointment,
      appointmentRealizationDateTime: data.realizationDateTime,
      appointmentEstimatedEndDateTime: dayjs(data.realizationDateTime).add(
        Number(data.duration),
        "minutes"
      ),
      appointmentDetails: appointmentDetails,
    }),
  });

  if (!response.ok) {
    if (response.status === 401)
      throw new ResponseError(
        "Uno de los usuarios no es un doctor",
        response.status
      );

    throw new ResponseError("Error al aprobar la cita", response.status);
  }

  return "Cita aprobada correctamente";
};

export const rejectAppointment = async (
  appointmentId: string,
  token: string
): Promise<string> => {
  const response = await fetch(
    `${BASE_URL}/appointment/reject/${appointmentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("Cita no encontrada", response.status);

    throw new ResponseError("Error al rechazar la cita", response.status);
  }

  return "Cita rechazada correctamente";
};

export const cancelAppointment = async (
  appointmentId: string,
  token: string
): Promise<string> => {
  const response = await fetch(
    `${BASE_URL}/appointment/cancel/${appointmentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("Cita no encontrada", response.status);

    throw new ResponseError("Error al cancelar la cita", response.status);
  }

  return "Cita cancelada correctamente";
};

export const executeAppointment = async (
  appointmentId: string,
  token: string
): Promise<string> => {
  const response = await fetch(
    `${BASE_URL}/appointment/execute/${appointmentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("Cita no encontrada", response.status);

    throw new ResponseError("Error al ejecutar la cita", response.status);
  }

  return "Cita ejecutada correctamente";
};

export const getPendingAppointments = async (
  token: string
): Promise<Appointment[]> => {
  const response = await fetch(`${BASE_URL}/appointment/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError(
      "Error al obtener las citas pendientes",
      response.status
    );
  }

  const { data } = await response.json();

  return data;
};

export const getAppointmentById = async (
  id: string,
  token: string
): Promise<Appointment> => {
  const response = await fetch(`${BASE_URL}/appointment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("Cita no encontrada", response.status);

    throw new ResponseError("Error al obtener la cita", response.status);
  }

  const { data } = await response.json();

  return data;
};

export const getOwnAppointments = async (
  token: string,
  status?: string
): Promise<AppointmentOwn[]> => {
  const query = new URLSearchParams();

  if (status && status !== "todos") {
    query.append("status", status);
  }

  const response = await fetch(
    `${BASE_URL}/appointment/own?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new ResponseError(
      "Error al obtener las citas propias",
      response.status
    );
  }

  const { data } = await response.json();

  return data;
};

export const finishAppointment = async (
  idAppointment: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/appointment/finish`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idAppointment,
    }),
  });

  if (!response.ok) {
    if (response.status === 401)
      throw new ResponseError(
        "El doctor no está autorizado para finalizar la cita",
        response.status
      );

    if (response.status === 404)
      throw new ResponseError("Cita no encontrada", response.status);

    if (response.status === 409)
      throw new ResponseError(
        "La cita ya ha sido finalizada",
        response.status
      );

    throw new ResponseError("Error al finalizar la cita", response.status);
  }

  return "Cita finalizada correctamente";
};

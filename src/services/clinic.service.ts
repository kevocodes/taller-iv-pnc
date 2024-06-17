import { Prescription } from "@/models/prescription.model";
import { ResponseError } from "../models/ResponseError.model";
import { AppointmentSchedule } from "@/models/appointment.model";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createPrescriptions = async (
  idAppointment: string,
  prescriptions: Prescription[],
  token: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/clinic/prescriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idAppointment,
      doseMedicineArray: prescriptions.map((prescriptions) => ({
        medicine: prescriptions.medicine,
        dose: prescriptions.dose,
        prescriptionEndLocalDateTime:
          prescriptions.prescriptionEndLocalDateTime,
      })),
    }),
  });

  if (!response.ok) {
    throw new ResponseError(
      "Error al crear las prescripciones",
      response.status
    );
  }

  return "Prescripciones creadas correctamente";
};


export const getSchedule = async (token: string, date: string): Promise<AppointmentSchedule[]> => {
  const response = await fetch(`${BASE_URL}/clinic/schedule?localDate=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new ResponseError("Error al obtener el horario", response.status);
  }

  const { data } = await response.json();

  return data;
};
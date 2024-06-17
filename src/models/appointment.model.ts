import { Prescription } from "./prescription.model";
import { UserFromAPI } from "./user.model";

export interface Appointment {
  idAppointment: string;
  user: UserFromAPI;
  reason: string;
  status: string;
  appointmentPrescriptions: Prescription[];
  appointmentRequestDateTime: string;
  appointmentEstimatedEndDateTime: string;
  appointmentRealizationDateTime: string;
  appointmentEndDateTime: string;
}

export interface AppointmentDetails {
  idUser: string;
  idSpecialty: string;
}

export interface AppointmentOwn {
  idAppointment: string;
  idUser: string;
  status: string;
  appointmentPrescriptions: Prescription[];
  reason: string;
  appointmentRealizationDateTime: string;
  appointmentRequestDateTime: string;
  appointmentEndDateTime: string;
}

export interface AppointmentSchedule {
  appointment: Appointment;
  doctors: string[];
  record: string[];
}

export enum AppointmentStatus {
  PENDING = "Pendiente por aprobar",
  PENDING_EXECUTION = "Pendiente de ejecución",
  IN_EXECUTION = "En ejecución",
  FINISHED = "Finalizada",
  CANCELED = "Cancelada",
  REJECTED = "Rechazada",
}
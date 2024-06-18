import { Appointment } from "@/models/appointment.model";
import { Prescription } from "@/models/prescription.model";
import { Record } from "@/models/record.model";
import { Specialty } from "@/models/specialty.model";
import { UserFromAPI } from "@/models/user.model";
import { approveAppointmentSchema } from "@/schemas/appointment.schema";
import { z } from "zod";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppointmentState {
  // Appointment from the API
  appointment: Appointment | null;

  // Prescription info and medical records
  appointmentPrescriptions: Prescription[];
  userMedicalRecords: Record[];

  // Approve appointment info
  doctors: UserFromAPI[];
  specialities: Specialty[];
  approveInformation: z.infer<typeof approveAppointmentSchema>;

  // Set appointment from the API
  setAppointment: (appointments: Appointment | null) => void;

  // Set prescriptions and medical records
  setAppointmentPrescriptions: (prescriptions: Prescription[]) => void;
  addAppointmentPrescriptions: (prescription: Prescription[]) => void;
  setUserMedicalRecords: (records: Record[]) => void;
  addUserMedicalRecord: (records: Record) => void;

  // Set doctors and specialities for appointment approval
  setDoctors: (doctors: UserFromAPI[]) => void;
  setSpecialties: (specialities: Specialty[]) => void;
  setApproveInformation: (
    approveInformation: z.infer<typeof approveAppointmentSchema>
  ) => void;
}

export const DEFAULT_APPROVE_INFORMATION = {
  duration: "",
  realizationDateTime: null,
};

export const useAppointment = create<AppointmentState>()(
  devtools((set) => ({
    appointment: null,

    appointmentPrescriptions: [],
    userMedicalRecords: [],

    doctors: [],
    specialities: [],
    approveInformation: DEFAULT_APPROVE_INFORMATION,

    setAppointment: (appointment) => set({ appointment }),

    setAppointmentPrescriptions: (prescriptions) =>
      set({ appointmentPrescriptions: prescriptions }),
    addAppointmentPrescriptions: (prescriptions) =>
      set((state) => ({
        appointmentPrescriptions: [
          ...state.appointmentPrescriptions,
          ...prescriptions,
        ],
      })),
    setUserMedicalRecords: (records) => set({ userMedicalRecords: records }),
    addUserMedicalRecord: (record) =>
      set((state) => ({
        userMedicalRecords: [...state.userMedicalRecords, record],
      })),

    setDoctors: (doctors) => set({ doctors }),
    setSpecialties: (specialities) => set({ specialities }),
    setApproveInformation: (approveInformation) => set({ approveInformation }),
  }))
);

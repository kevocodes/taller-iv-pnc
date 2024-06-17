import { Appointment } from "@/models/appointment.model";
import { Prescription } from "@/models/prescription.model";
import { Record } from "@/models/record.model";
import { Specialty } from "@/models/specialty.model";
import { UserFromAPI } from "@/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppointmentState {
  appointment: Appointment | null;
  doctors: UserFromAPI[];
  specialities: Specialty[];
  appointmentPrescriptions: Prescription[];
  userMedicalRecords: Record[];
  setAppointment: (appointments: Appointment | null) => void;
  setDoctors: (doctors: UserFromAPI[]) => void;
  setSpecialties: (specialities: Specialty[]) => void;
  setAppointmentPrescriptions: (prescriptions: Prescription[]) => void;
  addAppointmentPrescriptions: (prescription: Prescription[]) => void;
  setUserMedicalRecords: (records: Record[]) => void;
  addUserMedicalRecord: (records: Record) => void;
}

export const useAppointment = create<AppointmentState>()(
  devtools((set) => ({
    appointment: null,
    doctors: [],
    specialities: [],
    appointmentPrescriptions: [],
    userMedicalRecords: [],
    setAppointment: (appointment) => set({ appointment }),
    setDoctors: (doctors) => set({ doctors }),
    setSpecialties: (specialities) => set({ specialities }),
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
  }))
);

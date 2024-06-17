import { AppointmentSchedule } from "@/models/appointment.model";
import { Prescription } from "@/models/prescription.model";
import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ScheduleAppointmentsState {
  appointments: AppointmentSchedule[];
  date: string;
  setAppointments: (appointments: AppointmentSchedule[]) => void;
  setDate: (date: string) => void;
  prescriptions: Prescription[];
  setPrescriptions: (prescriptions: Prescription[]) => void;
  addPrescription: (prescription: Prescription) => void;
  records: string[];
  setRecords: (records: string[]) => void;
  addRecord: (record: string) => void;
}

export const useScheduleAppointments = create<ScheduleAppointmentsState>()(
  devtools((set) => ({
    appointments: [],
    date: dayjs().toISOString(),
    prescriptions: [],
    records: [],
    setAppointments: (appointments) => set({ appointments }),
    setDate: (date) => set({ date }),
    setPrescriptions: (prescriptions) => set({ prescriptions }),
    addPrescription: (prescription) =>
      set((state) => ({
        prescriptions: [...state.prescriptions, prescription],
      })),
    setRecords: (records) => set({ records }),
    addRecord: (record) =>
      set((state) => ({ records: [...state.records, record] })),
  }))
);

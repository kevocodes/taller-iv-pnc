import { Appointment } from "@/models/appointment.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PrescriptAppointmentsState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

export const usePrescriptAppointments = create<PrescriptAppointmentsState>()(
  devtools((set) => ({
    appointments: [],
    setAppointments: (appointments) => set({ appointments }),
  }))
);

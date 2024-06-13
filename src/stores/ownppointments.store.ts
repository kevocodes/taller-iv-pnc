import { AppointmentOwn } from "@/models/appointment.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OwnAppointmentsState {
  appointments: AppointmentOwn[];
  statusFilter: string;
  setAppointments: (appointments: AppointmentOwn[]) => void;
  setStatusFilter: (status: string) => void;
}

export const useOwnAppointments = create<OwnAppointmentsState>()(
  devtools((set) => ({
    appointments: [],
    statusFilter: "",
    setAppointments: (appointments) => set({ appointments }),
    setStatusFilter: (status) => set({ statusFilter: status }),
  }))
);

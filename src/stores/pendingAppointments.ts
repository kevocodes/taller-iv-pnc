import { Appointment } from "@/models/appointment.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PendingAppointmentsState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  removeAppointment: (id: string) => void;
}

export const usePendingAppointments = create<PendingAppointmentsState>()(
  devtools((set) => ({
    appointments: [],
    setAppointments: (appointments) => set({ appointments }),
    removeAppointment: (id) =>
      set((state) => ({
        appointments: state.appointments.filter(
          (appointment) => appointment.idAppointment !== id
        ),
      })),
  }))
);

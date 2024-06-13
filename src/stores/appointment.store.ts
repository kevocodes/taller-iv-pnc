import { Appointment } from "@/models/appointment.model";
import { Specialty } from "@/models/specialty.model";
import { UserFromAPI } from "@/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppointmentsState {
  appointment: Appointment | null;
  doctors: UserFromAPI[];
  specialities: Specialty[];
  setAppointment: (appointments: Appointment | null) => void;
  setDoctors: (doctors: UserFromAPI[]) => void;
  setSpecialties: (specialities: Specialty[]) => void
}

export const useAppointment = create<AppointmentsState>()(
  devtools((set) => ({
    appointment: null,
    doctors: [],
    specialities: [],
    setAppointment: (appointment) => set({ appointment }),
    setDoctors: (doctors) => set({ doctors }),
    setSpecialties: (specialities) => set({ specialities })
  }))
);

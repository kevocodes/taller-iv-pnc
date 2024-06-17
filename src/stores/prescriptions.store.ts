
import { Prescription } from "@/models/prescription.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface userState {
  prescriptions: Prescription[];
  setPrescriptions: (prescriptions: Prescription[]) => void;
  addPrescription: (prescription: Prescription) => void;
  removePrescription: (prescription: Prescription) => void;
}

export const usePrescriptions = create<userState>()(
  devtools((set) => ({
    prescriptions: [],
    setPrescriptions: (prescriptions) => set({ prescriptions }),
    addPrescription: (prescription) =>
      set((state) => ({
        prescriptions: [...state.prescriptions, prescription],
      })),
    removePrescription: (prescription) =>
      set((state) => ({
        prescriptions: state.prescriptions.filter(
          (p) => p.idPrescription !== prescription.idPrescription
        ),
      })),
  }))
);

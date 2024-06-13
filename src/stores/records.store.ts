import { Record } from "@/models/record.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface userState {
  records: Record[];
  setRecords: (users: Record[]) => void;
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
}

export const useRecords = create<userState>()(
  devtools((set) => ({
    records: [],
    startDate: "",
    endDate: "",
    setRecords: (records) => set({ records }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
  }))
);

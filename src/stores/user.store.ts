import { UserFromAPI } from "@/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface userState {
  user: UserFromAPI | null;
  setUser: (user: UserFromAPI | null) => void;
}

export const useUser = create<userState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }))
);

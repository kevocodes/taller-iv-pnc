import { UserFromAPI } from "@/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface userState {
  users: UserFromAPI[];
  setUsers: (users: UserFromAPI[]) => void;
}

export const useUsers = create<userState>()(
  devtools((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
  }))
);

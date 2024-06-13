import { User } from "@/models/user.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface authState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<authState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        logout: () => set({ token: null, user: null }),
      }),
      { name: "ym-auth" }
    )
  )
);

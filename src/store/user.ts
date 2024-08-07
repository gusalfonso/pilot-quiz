import { create } from "zustand";

interface UserState {
  user: { username: string; password: string } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (username: string, password: string) =>
    set({ user: { username, password } }),
  logout: () => set({ user: null }),
}));

import create from "zustand";

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: null,
  isAuthenticated: false,
  login: (username: string) => set({ username, isAuthenticated: true }),
  logout: () => set({ username: null, isAuthenticated: false }),
}));

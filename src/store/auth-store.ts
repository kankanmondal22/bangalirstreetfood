import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authClient } from "@/utils/auth-client";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      checkAuth: async () => {
        set({ isLoading: true });
        const { data: session, error } = await authClient.getSession();
        if (session?.user) {
          set({
            user: {
              id: session.user.id,
              email: session.user.email,
              name: session.user.name,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          if (error) console.error("Session check failed:", error.message);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        checkAuthStatus: async () => {
          try {
            set({ isLoading: true });
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/auth/status`,
              {
                credentials: "include", // Send cookies
              }
            );
            const data = await response.json();

            if (data.authenticated && data.user) {
              set({
                user: data.user,
                isAuthenticated: true,
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
              });
            }
          } catch (error) {
            console.error("Auth check failed:", error);
            set({
              user: null,
              isAuthenticated: false,
            });
          } finally {
            set({ isLoading: false });
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true });
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
              method: "DELETE",
              credentials: "include",
            });
            set({
              user: null,
              isAuthenticated: false,
              error: null,
              isLoading: false, // ✅ ADD THIS
            });
          } catch (error) {
            console.error("Logout error:", error);
            set({ isLoading: false });
            throw error;
          }
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

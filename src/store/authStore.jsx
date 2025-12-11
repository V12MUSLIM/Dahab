import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set, get) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,

    setUser: (user) => {
      set({
        user,
        isAuthenticated: Boolean(user),
      });
    },

    setAccessToken: (token) => {
      set({ accessToken: token });
    },

    hasRole: (role) => {
      const user = get().user;
      if (!user?.role) return false;

      if (Array.isArray(role)) return role.includes(user.role);
      return user.role === role;
    },

    logout: async () => {
      // Clear local state immediately
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });

      // Call logout API to clear refresh token cookie on server
      try {
        const { authApi } = await import("@/api/authApi");
        await authApi.logout();
      } catch (error) {
        // Logout API failed, but local state is already cleared
        console.error("Logout API call failed:", error);
      }
    },
  }))
);
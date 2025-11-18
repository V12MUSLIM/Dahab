import { create } from "zustand";
import { devtools } from "zustand/middleware";

/** Validate user structure */
const isValidUser = (user) => {
  if (!user || typeof user !== "object") return false;
  const hasId =
    typeof user.id === "string" ||
    typeof user.id === "number" ||
    typeof user._id === "string" ||
    typeof user._id === "number";
  const hasEmail = typeof user.email === "string" && user.email.length > 0;
  return hasId && hasEmail;
};

/** API config */
const getApiConfig = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const isDevelopment = import.meta.env.DEV;

  if (!baseUrl) {
    console.error("VITE_API_URL is not set");
    return { baseUrl: "", timeout: 10000, isValid: false };
  }

  try {
    new URL(baseUrl);
  } catch {
    console.error("Invalid VITE_API_URL format");
    return { baseUrl, timeout: 10000, isValid: false };
  }

  if (!isDevelopment && !baseUrl.startsWith("https://")) {
    console.error("API URL must use HTTPS in production");
    return { baseUrl, timeout: 10000, isValid: false };
  }

  return { baseUrl, timeout: 10000, isValid: true };
};

export const API_CONFIG = getApiConfig();

/** Secure fetch */
export const secureFetch = async (url, options = {}) => {
  if (!API_CONFIG.isValid) throw new Error("Invalid API configuration");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") throw new Error("Request timeout");
    throw error;
  }
};

/** Clean user for devtools */
const sanitizeUserForDevtools = (user) => {
  if (!user) return null;
  const { password, token, refreshToken, ...safeData } = user;
  return safeData;
};

const middleware = (f) =>
  import.meta.env.DEV
    ? devtools(f, {
        name: "AuthStore",
        serialize: {
          replacer: (key, value) => {
            if (key === "user") return sanitizeUserForDevtools(value);
            return value;
          },
        },
      })
    : f;

export const useAuthStore = create(
  middleware((set, get) => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    lastAuthCheck: null,
    isCheckingAuth: false,

    setUser: (user) => {
      if (user && !isValidUser(user)) {
        console.error("Invalid user data structure:", user);
        return;
      }
      set({
        user,
        isAuthenticated: !!user,
        error: null,
        lastAuthCheck: Date.now(),
      });
    },

    // 🆕 Helper to check role access
    hasRole: (requiredRoles) => {
      const { user } = get();
      if (!user || !user.role) return false;
      if (Array.isArray(requiredRoles)) {
        return requiredRoles.includes(user.role);
      }
      return user.role === requiredRoles;
    },

    setAccessToken: (token) => set({ accessToken: token }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "An unknown error occurred";
      set({ error: message, isLoading: false });
    },

    /** ✅ Auth status checker with auto-refresh */
    checkAuthStatus: async () => {
      const state = get();

      if (state.isCheckingAuth) return state.user;
      if (state.lastAuthCheck && Date.now() - state.lastAuthCheck < 30000) {
        return state.user;
      }

      try {
        set({ isLoading: true, isCheckingAuth: true, error: null });

        const response = await secureFetch(`${API_CONFIG.baseUrl}/auth/status`);
        if (response.status === 401) {
          const newToken = await get().refreshAccessToken();
          if (newToken) {
            const retry = await secureFetch(
              `${API_CONFIG.baseUrl}/auth/status`,
              {
                headers: { Authorization: `Bearer ${newToken}` },
              }
            );
            const retryData = await retry.json();
            if (retryData.authenticated && isValidUser(retryData.user)) {
              set({
                user: retryData.user,
                isAuthenticated: true,
                lastAuthCheck: Date.now(),
              });
              return retryData.user;
            }
          }
        }

        const data = await response.json();
        if (data.authenticated && isValidUser(data.user)) {
          set({
            user: data.user,
            isAuthenticated: true,
            lastAuthCheck: Date.now(),
          });
          return data.user;
        }

        set({
          user: null,
          isAuthenticated: false,
          lastAuthCheck: Date.now(),
        });
        return null;
      } catch (error) {
        console.error("Auth check failed:", error);
        set({
          user: null,
          isAuthenticated: false,
          error: error.message || "Failed to verify authentication",
          lastAuthCheck: Date.now(),
        });
        return null;
      } finally {
        set({ isLoading: false, isCheckingAuth: false });
      }
    },

    logout: async () => {
      const state = get();
      if (state.isLoading) return;

      set({ isLoading: true, error: null });
      try {
        await secureFetch(`${API_CONFIG.baseUrl}/auth/logout`, {
          method: "DELETE",
        });
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
          lastAuthCheck: Date.now(),
        });
      } catch (error) {
        console.error("Logout error:", error);
        set({
          error: error.message || "Logout failed",
          isLoading: false,
        });
      }
    },

    clearAuth: () => {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
        lastAuthCheck: null,
      });
    },
  }))
);

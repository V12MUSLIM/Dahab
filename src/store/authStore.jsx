import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Validates user object structure
 * Supports both MongoDB (_id) and standard (id) formats
 */
const isValidUser = (user) => {
  if (!user || typeof user !== "object") {
    return false;
  }

  const hasId =
    typeof user.id === "string" ||
    typeof user.id === "number" ||
    typeof user._id === "string" ||
    typeof user._id === "number";

  const hasEmail = typeof user.email === "string" && user.email.length > 0;

  return hasId && hasEmail;
};

/**
 * API configuration with validation
 */
const getApiConfig = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const isDevelopment = import.meta.env.DEV;

  if (!baseUrl) {
    console.error("VITE_API_URL environment variable is not set");
    return { baseUrl: "", timeout: 10000, isValid: false };
  }

  /* Validate URL format */
  try {
    new URL(baseUrl);
  } catch {
    console.error("Invalid VITE_API_URL format");
    return { baseUrl, timeout: 10000, isValid: false };
  }

  /* HTTPS required in production */
  if (!isDevelopment && !baseUrl.startsWith("https://")) {
    console.error("API URL must use HTTPS in production");
    return { baseUrl, timeout: 10000, isValid: false };
  }

  return { baseUrl, timeout: 10000, isValid: true };
};

const API_CONFIG = getApiConfig();

/**
 * Secure fetch wrapper with timeout and error handling
 */
const secureFetch = async (url, options = {}) => {
  if (!API_CONFIG.isValid) {
    throw new Error("Invalid API configuration");
  }

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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
};

/**
 * Sanitize user data for devtools (remove sensitive fields)
 */
const sanitizeUserForDevtools = (user) => {
  if (!user) return null;
  const { password, token, refreshToken, ...safeData } = user;
  return safeData;
};

/**
 * Only enable devtools in development
 */
const middleware = (f) =>
  import.meta.env.DEV
    ? devtools(f, {
        name: "AuthStore",
        serialize: {
          replacer: (key, value) => {
            if (key === "user") {
              return sanitizeUserForDevtools(value);
            }
            return value;
          },
        },
      })
    : f;

export const useAuthStore = create(
  middleware((set, get) => ({
    user: null,
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

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "An unknown error occurred";

      set({
        error: errorMessage,
        isLoading: false,
      });
    },

    checkAuthStatus: async () => {
      const state = get();

      if (state.isCheckingAuth) return state.user;
      if (state.lastAuthCheck && Date.now() - state.lastAuthCheck < 30000) {
        return state.user;
      }

      try {
        set({ isLoading: true, isCheckingAuth: true, error: null });

        const response = await secureFetch(`${API_CONFIG.baseUrl}/auth/status`);
        const data = await response.json();

        if (typeof data.authenticated !== "boolean") {
          throw new Error("Invalid authentication response format");
        }

        if (data.authenticated) {
          if (!isValidUser(data.user)) {
            throw new Error("Invalid user data received from server");
          }

          const user = data.user;

          set({
            user,
            isAuthenticated: true,
            error: null,
            lastAuthCheck: Date.now(),
          });

          return user; // ✅ <---- RETURN user here
        } else {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            lastAuthCheck: Date.now(),
          });

          return null; // ✅ <---- Return null for not authenticated
        }
      } catch (error) {
        console.error("Auth check failed:", error);

        set({
          user: null,
          isAuthenticated: false,
          error: error.message || "Failed to verify authentication",
          lastAuthCheck: Date.now(),
        });

        return null; // ✅ <---- Always return something
      } finally {
        set({ isLoading: false, isCheckingAuth: false });
      }
    },

    logout: async () => {
      const state = get();

      if (state.isLoading) {
        return;
      }

      const previousState = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      };

      set({ isLoading: true, error: null });

      try {
        await secureFetch(`${API_CONFIG.baseUrl}/auth/logout`, {
          method: "DELETE",
        });

        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
          lastAuthCheck: Date.now(),
        });
      } catch (error) {
        console.error("Logout error:", error);

        set({
          user: previousState.user,
          isAuthenticated: previousState.isAuthenticated,
          error: error.message || "Logout failed. Please try again.",
          isLoading: false,
        });

        throw error;
      }
    },

    clearAuth: () => {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
        lastAuthCheck: null,
      });
    },
  }))
);

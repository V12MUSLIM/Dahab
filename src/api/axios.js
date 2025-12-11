import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Track ongoing refresh request to prevent race conditions
let refreshTokenPromise = null;

// inject token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // Reuse existing refresh request if one is already in progress
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios
            .post(
              `${BASE_URL}/auth/refresh`,
              {},
              { withCredentials: true }
            )
            .finally(() => {
              // Clear the promise after completion
              refreshTokenPromise = null;
            });
        }

        const refreshRes = await refreshTokenPromise;
        const newToken = refreshRes.data?.accessToken;
        
        if (newToken) {
          useAuthStore.getState().setAccessToken(newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        useAuthStore.getState().logout();
        
        // Redirect to login if not already there
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
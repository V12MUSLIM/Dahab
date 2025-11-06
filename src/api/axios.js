import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// ✅ attach accessToken from memory before every request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ handle automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // only retry once if 401 (expired token)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh token using the secure cookie (httpOnly)
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data?.accessToken;
        if (newAccessToken) {
          const { setAccessToken } = useAuthStore.getState();
          setAccessToken(newAccessToken);

          // update header and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // clear state and redirect if refresh fails
        const { clearAuth } = useAuthStore.getState();
        clearAuth();

        // avoid hard navigation loop if already on login page
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }

    // if any other error, reject normally
    return Promise.reject(error);
  }
);

export default api;

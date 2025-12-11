import api from "./axios";

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  status: () => api.get("/auth/status"),
  logout: () => api.delete("/auth/logout"),
};

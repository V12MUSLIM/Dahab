import api from "../api/axios";

export const getPackages = async () => {
  const response = await api.get("/packages");
  return response.data.packages
  
};

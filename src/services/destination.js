import api from "@/api/axios";

export const getDestinations = async () => {
  const response = await api.get("/destination");
  console.log("API response:", response.data);
  return response.data;
};

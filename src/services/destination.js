import api from "@/api/axios";

export const getDestinations = async () => {
  const response = await api.get("/destination");
  return response.data.destinations;
};

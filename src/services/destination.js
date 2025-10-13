import api from "@/api/axios";

export const getDestinations = async () => {
  const response = await api.get("/destinations");
  console.log("API response:", response.data);
  return response.data;
};

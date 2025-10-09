import api from "../api/axios";

export const getActivities = async () => {
  const response = await api.get("/activities");
  console.log("API response:", response.data); 
  return response.data.activities; 
};

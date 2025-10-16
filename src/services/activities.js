import api from "../api/axios";

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data.activities; 
};

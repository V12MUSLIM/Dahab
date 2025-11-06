import api from "@/api/axios";

export const getExperiences = async () => {
  const response = await api.get("/experience");
  return response.data.experiences;
};
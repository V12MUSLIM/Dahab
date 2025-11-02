import api from "@/api/axios";

export const getExperiences = async () => {
  const response = await api.get("/experience");
  console.log(response.data.experiences);
  return response.data.experiences;
};
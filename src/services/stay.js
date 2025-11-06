import api from "@/api/axios";

export const getStays = async () => {
  const response = await api.get("/stay");

  // Some backends send `stay`, others `stays`
  const categories = response.data?.stay || response.data?.stays;
  if (!Array.isArray(categories)) {
    console.error("Unexpected response format:", response.data);
    return [];
  }

  const allStays = categories.flatMap((category) => category.stays || []);
  return allStays;
};

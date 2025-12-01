import api from "@/api/axios";

export const getStays = async () => {
  const response = await api.get("/stay");

  const categories = response.data?.stay || response.data?.stays;
  if (!Array.isArray(categories)) {
    console.error("Unexpected stay response:", response.data);
    
    return [];
  }

  return categories.flatMap((category) => category.stays || []);
};


import api from "@/api/axios";
export const getStays = async () => {
  const response = await api.get("/stay");

  if (!response.data?.stays) {
    console.error("Unexpected response format:", response.data);
    return [];
  }

  const allStays = response.data.stays.flatMap(
    (category) => category.stays || []
  );
  return allStays;
};

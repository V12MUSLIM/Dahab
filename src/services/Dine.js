import api from "@/api/axios";

export const getDine = async () => {
  try {
    const response = await api.get("/resturant");
    return response.data.restaurants || response.data.data || [];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getDineById = async (id) => {
  try {
    const response = await api.get(`/resturant/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};



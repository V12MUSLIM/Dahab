import api from "@/api/axios";

export const getRestaurants = async () => {
  try {
    const response = await api.get("/resturant");
    const data = response.data.restaurants || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};

export const getCafes = async () => {
  try {
    const response = await api.get("/cafe");
    const data = response.data.cafes || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching cafes:", error);
    return [];
  }
};

export const getDineById = async (id) => {
  try {
    const response = await api.get(`/resturant/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    try {
      const response = await api.get(`/cafe/${id}`);
      return response.data.data || response.data;
    } catch (err) {
      console.error("Error:", err);
      return null;
    }
  }
};

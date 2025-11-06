import api from "@/api/axios";

export const getRestaurants = async () => {
  try {
    const response = await api.get("/restaurant"); 
    console.log("Restaurant Response:", response);
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
    console.log("Cafe Response:", response);
    const data = response.data.cafes || response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching cafes:", error);
    return [];
  }
};

export const getDineById = async (id) => {
  try {
    const response = await api.get(`/restaurant/${id}`); 
    return response.data.data || response.data;
  } catch (eroor) {
    try {
      const response = await api.get(`/cafe/${id}`);
      return response.data.data || response.data;
    } catch (err) {
      console.error("Error:", err);
      return null;
    }
  }
};

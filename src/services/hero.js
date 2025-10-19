import api from "../api/axios";

export const getHero = async () => {
  const response = await api.get("/hero/homeHero"); 
  return response.data;
};

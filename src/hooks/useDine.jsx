import { useQuery } from "@tanstack/react-query";
import { getDine } from "@/services/Dine";
import { useState, useMemo } from "react";

export const useDine = () => {
  const {
    data: restaurants = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dine"],
    queryFn: getDine,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const [favorites, setFavorites] = useState([]);

  const getAllCategories = useMemo(() => {
    if (!restaurants || restaurants.length === 0) return [];
    return [...new Set(restaurants.map((r) => r.category))];
  }, [restaurants]);

  const getDineByCategory = (category) => {
    if (!restaurants) return [];
    if (category === "All") return restaurants;
    return restaurants.filter((r) => r.category === category);
  };

  const getDineById = (idPage) => {
    if (!restaurants) return null;
    return restaurants.find(
      (r) => String(r.IdPage).toLowerCase() === String(idPage).toLowerCase()
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return {
    restaurants,
    getAllCategories,
    getDineByCategory,
    getDineById,
    toggleFavorite,
    isFavorite,
    favorites,
    isLoading,
    error,
    isError,
  };
};

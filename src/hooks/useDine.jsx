import { useQuery } from "@tanstack/react-query";
import { getRestaurants, getCafes } from "@/services/Dine";
import { useState, useMemo } from "react";

export const useDine = () => {
  const { data: restaurants = [], isLoading: loadingRestaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
    staleTime: 5 * 60 * 1000,
  });

  const { data: cafes = [], isLoading: loadingCafes } = useQuery({
    queryKey: ["cafes"],
    queryFn: getCafes,
    staleTime: 5 * 60 * 1000,
  });

  const [favorites, setFavorites] = useState([]);

  const allDining = useMemo(() => {
      console.log("Restaurants from API:", restaurants);
  console.log("Cafes from API:", cafes);

    return [...(restaurants || []), ...(cafes || [])];
  }, [restaurants, cafes]);

  const isLoading = loadingRestaurants || loadingCafes;

  const getAllCategories = useMemo(() => {
    if (!allDining || allDining.length === 0) return [];
    return [...new Set(allDining.map((d) => d.category).filter(Boolean))];
  }, [allDining]);

  const getDineByCategory = (category) => {
    if (!allDining) return [];
    if (category === "All") return allDining;
    return allDining.filter((d) => d.category === category);
  };

  const getDineById = (idPage) => {
    if (!allDining) return null;
    return allDining.find(
      (d) => String(d.IdPage).toLowerCase() === String(idPage).toLowerCase()
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
    cafes,
    allDining,
    getAllCategories,
    getDineByCategory,
    getDineById,
    toggleFavorite,
    isFavorite,
    favorites,
    isLoading,
  };
};

// hooks/useDestination.js
import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "@/services/destination";
import { useState } from "react";

export const useDestinations = () => {
  const {
    data: destinations,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const getAllCategories = () => {
    if (!destinations || destinations.length === 0) return [];
    return [...new Set(destinations.map((d) => d.category))];
  };

  const getDestinationsByCategory = (category) => {
    if (!destinations) return [];
    return destinations.filter((d) => d.category === category);
  };

  const getDestinationById = (idPage) => {
    if (!destinations) return null;
    return destinations.find(
      (d) => String(d.IdPage).toLowerCase() === String(idPage).toLowerCase()
    );
  };

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return {
    destinations,
    getAllCategories,
    getDestinationsByCategory,
    getDestinationById,
    toggleFavorite,
    isFavorite,
    isLoading,
    error,
    isError,
  };
};

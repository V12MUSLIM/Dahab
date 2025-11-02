import { useQuery } from "@tanstack/react-query";
import { getExperiences} from "@/services/Experience";
import { useState } from "react";

export const useExperiences = () => {
  const {
    data: experiences,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const getAllCategories = () => {
    if (!experiences || experiences.length === 0) return [];
    return [...new Set(experiences.map((d) => d.category))];
  };

  const getExperiencesByCategory = (category) => {
    if (!experiences) return [];
    return experiences.filter((d) => d.category === category);
  };

  const getExperienceById = (idPage) => {
    if (!experiences) return null;
    return experiences.find(
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
    experiences,
    getAllCategories,
    getExperiencesByCategory,
    getExperienceById,
    toggleFavorite,
    isFavorite,
    isLoading,
    error,
    isError,
  };
};
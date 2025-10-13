import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "@/services/destination";

export const useDestinations = () => {
  const { data: destinations = [], isLoading, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const getAllCategories = () => {
    return [...new Set(destinations.map((d) => d.category))];
  };

  const getDestinationsByCategory = (category) => {
    return destinations.filter((d) => d.category === category);
  };

  return { destinations, getAllCategories, getDestinationsByCategory, isLoading, error };
};

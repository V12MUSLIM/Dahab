// src/hooks/useHero.jsx
import { useQuery } from "@tanstack/react-query";
import { getHero } from "@/services/hero";

export const useHero = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: getHero,
  });
};

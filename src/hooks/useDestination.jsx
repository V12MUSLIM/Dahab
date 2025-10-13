import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "../services/destinations";

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });
};

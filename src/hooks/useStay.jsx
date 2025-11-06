import { getStays } from "@/services/stay";
import { useQuery } from "@tanstack/react-query";
export const useStay = () => {
  return useQuery({
    queryKey: ["stays"],
    queryFn: getStays,
  });
};

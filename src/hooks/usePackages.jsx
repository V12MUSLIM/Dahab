import { useQuery } from "@tanstack/react-query";
import { getPackages } from "@/services/packages";

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });
};

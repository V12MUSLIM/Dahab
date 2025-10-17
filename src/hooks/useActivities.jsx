import { useQuery } from "@tanstack/react-query";
import { getActivities } from "@/services/activities";

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });
};

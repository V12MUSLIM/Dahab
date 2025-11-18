import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export function useSocials() {
  const queryClient = useQueryClient();

  // GET social media
  const socialsQuery = useQuery({
    queryKey: ["social-media"],
    queryFn: async () => {
      const res = await api.get("/social-media");
      return res.data.socialMediaes || res.data.socials || res.data.contacts || res.data || [];
    },
  });

  // ADD new social media
  const addSocial = useMutation({
    mutationFn: (body) => api.post("/social-media/add", body),
    onSuccess: () => {
      queryClient.invalidateQueries(["social-media"]);
    },
  });

  // UPDATE social media - now accepts all fields
  const updateSocial = useMutation({
    mutationFn: ({ id, name, href, icon, label, color }) =>
      api.put(`/social-media/update/${id}`, { name, href, icon, label, color }),
    onSuccess: () => {
      queryClient.invalidateQueries(["social-media"]);
    },
  });

  return {
    socialsQuery,
    addSocial,
    updateSocial,
  };
}
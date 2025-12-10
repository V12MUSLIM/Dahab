import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "sonner";
export function useSocials() {
  const queryClient = useQueryClient();

  // GET social media
  const socialsQuery = useQuery({
    queryKey: ["social-media"],
    queryFn: async () => {
      const res = await api.get("/social-media");
      return (
        res.data.socialMediaes ||
        res.data.socials ||
        res.data.contacts ||
        res.data ||
        []
      );
    },
  });

  // ADD new social media
  // ADD
  const addSocial = useMutation({
    mutationFn: (body) => api.post("/social-media/add", body),
    onSuccess: () => {
      toast.success("Social added");
      queryClient.invalidateQueries(["social-media"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add social");
    },
  });

  // UPDATE
  const updateSocial = useMutation({
    mutationFn: ({ id, name, href, icon, label, color }) =>
      api.put(`/social-media/update/${id}`, {
        name,
        href,
        icon,
        label,
        color,
      }),
    onSuccess: () => {
      toast.success("Social updated");
      queryClient.invalidateQueries(["social-media"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update social");
    },
  });

  // DELETE
  const deleteSocial = useMutation({
    mutationFn: ({ id }) => api.delete(`/social-media/delete/${id}`),
    onSuccess: () => {
      toast.success("Social deleted");
      queryClient.invalidateQueries(["social-media"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete social");
    },
  });

  return {
    socialsQuery,
    addSocial,
    updateSocial,
    deleteSocial,
  };
}

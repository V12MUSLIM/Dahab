import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export function useContact() {
  const queryClient = useQueryClient();

  const contactQuery = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await api.get("/contact");
      return res.data.contacts[0];
    },
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, email, phone }) => {
      const response = await api.put(`/contact/update/${id}`, { email, phone });
      return response.data;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["contact"]);

      const previous = queryClient.getQueryData(["contact"]);

      queryClient.setQueryData(["contact"], (old) => ({
        ...old,
        ...newData,
      }));

      return { previous };
    },
    onError: (err, newData, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["contact"], ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["contact"]);
    },
  });

  return { contactQuery, updateContact };
}

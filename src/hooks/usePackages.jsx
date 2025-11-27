import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

export const usePackages = () => {
  const queryClient = useQueryClient();

  // Query for fetching packages
  const query = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await api.get("/packages");
      return res.data.packages || [];
    },
  });

  // Mutation for adding a package
  const addPackage = useMutation({
    mutationFn: (body) => api.post("/packages/add", body),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
    },
  });

  // Mutation for updating a package
  const updatePackage = useMutation({
    mutationFn: ({ id, ...body }) => api.put(`/packages/update/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
    },
  });

  // Mutation for deleting a package
  const deletePackage = useMutation({
    mutationFn: (id) => api.delete(`/packages/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
    },
  });

  return {
    // Query data and states
    packages: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    
    // Mutations
    addPackage,
    updatePackage,
    deletePackage,
  };
};
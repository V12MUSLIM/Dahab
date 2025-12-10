import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "sonner";

export function useStayMutations() {
  const queryClient = useQueryClient();

  // Update stay mutation
  const updateStay = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/stay/update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      toast.success("Stay updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update stay");
    },
  });

  // Delete stay mutation
  const deleteStay = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/stay/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      toast.success("Stay deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete stay");
    },
  });

  // Update room mutation
  const updateRoom = useMutation({
    mutationFn: async ({ stayId, rooms }) => {
      const response = await api.put(`/stay/update/${stayId}`, {
        roomTypes: rooms, // MUST be an array, NOT a single room
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      toast.success("Room updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update room");
    },
  });

  return {
    updateStay,
    deleteStay,
    updateRoom,
  };
}

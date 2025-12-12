import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "@/api/axios";
import {toast} from "sonner";


export function useDestinationMutation() {
    const queryClient = useQueryClient();

// Add destination mutation
    const addDestination = useMutation({
        mutationFn: async (data) => {
            const response = await api.post("/destination/add", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["destinations"]});
            toast.success("Destination added successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add destination");
        },
    });

// Update destination mutation
    const updateDestination = useMutation({
        mutationFn: async ({id, data}) => {
            const response = await api.put(`/destination/update/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["destinations"]});
            toast.success("Destination updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update destination");
        },
    });
    
// Delete destination mutation
    const deleteDestination = useMutation({
        mutationFn: async (id) => {
            const response = await api.delete(`/destination/delete/${id}`);    
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["destinations"]});
            toast.success("Destination deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete destination");
        },
    });
    return {
        addDestination,
        updateDestination,
        deleteDestination,
    };
}
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export function useSyncUserToQuery() {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, error } = useAuthStore();

  useEffect(() => {
    // Push Zustand state into TanStack Query
    queryClient.setQueryData(["user"], { user, isAuthenticated, isLoading, error });
  }, [user, isAuthenticated, isLoading, error, queryClient]);
}

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useAuthCheck = () => {
  const { checkAuthStatus, isLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) await checkAuthStatus();
    })();
    return () => {
      mounted = false;
    };
  }, [checkAuthStatus]);

  return { isLoading };
};

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useAuthCheck = () => {
  const { checkAuthStatus, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { isLoading };
};

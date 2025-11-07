import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/config/SiteConfig";
import Loading from "@/components/Loading";
import DefaultLayout from "./DefaultLayout";

export default function ProtectedLayout({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isCheckingAuth && !isAuthenticated) {
      navigate(ROUTES.login, { replace: true });
    }
  }, [isAuthenticated, isLoading, isCheckingAuth, navigate]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading loadingMessage="Checking session..." />
      </div>
    );
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}

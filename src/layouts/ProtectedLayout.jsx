import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/config/SiteConfig";
import Loading from "@/components/Loading";
import DefaultLayout from "./DefaultLayout";

export default function ProtectedLayout({ children, allowedRoles }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isCheckingAuth, hasRole } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isCheckingAuth) {
      if (!isAuthenticated) {
        navigate(ROUTES.login, { replace: true });
      } else if (allowedRoles && !hasRole(allowedRoles)) {
        // 🚫 user authenticated but not authorized
        navigate("/403", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, isCheckingAuth, allowedRoles, navigate, hasRole]);

  if (isLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading loadingMessage="Checking session..." />
      </div>
    );
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}

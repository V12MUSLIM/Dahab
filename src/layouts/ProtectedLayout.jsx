import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/config/SiteConfig";
import Loading from "@/components/Loading";
import DefaultLayout from "./DefaultLayout";

export default function ProtectedLayout({ allowedRoles }) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    hasRole,
    isInitialized,
  } = useAuthStore();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  // 🚨 FIX: do NOT run redirect logic before initialization
  useEffect(() => {
    if (!isInitialized) return;
    if (isCheckingAuth || isLoading) return;

    if (!isAuthenticated) {
      navigate(ROUTES.login, { replace: true });
      return;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
      navigate("/403", { replace: true });
    }
  }, [
    isInitialized,      // <-- REQUIRED
    isAuthenticated,
    isCheckingAuth,
    isLoading,
    allowedRoles,
    navigate,
    hasRole,
  ]);

  // 🚨 MUST BE FIRST CHECK
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading loadingMessage="Checking session..." />
      </div>
    );
  }

  // After initialization but still loading
  if (isLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading loadingMessage="Checking session..." />
      </div>
    );
  }

  if (isDashboardRoute) {
    return <Outlet />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

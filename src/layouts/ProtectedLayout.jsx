import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/config/SiteConfig";
import Loading from "@/components/Loading";
import DefaultLayout from "./DefaultLayout";
import DashboardLayout from "./DashboardLayout";
export default function ProtectedLayout({
  children,
  allowedRoles,
  useDefaultLayout = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, isCheckingAuth, hasRole } =
    useAuthStore();

  // Check if we're on a dashboard route
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    if (!isLoading && !isCheckingAuth) {
      if (!isAuthenticated) {
        navigate(ROUTES.login, { replace: true });
      } else if (allowedRoles && !hasRole(allowedRoles)) {
        navigate("/403", { replace: true });
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    allowedRoles,
    navigate,
    hasRole,
  ]);

  if (isLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading loadingMessage="Checking session..." />
      </div>
    );
  }

  // For dashboard routes, don't wrap in DefaultLayout
  if (isDashboardRoute) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  // For other protected routes (like /settings), use DefaultLayout
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

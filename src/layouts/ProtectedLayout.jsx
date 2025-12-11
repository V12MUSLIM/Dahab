import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedLayout({ allowedRoles }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
      navigate("/403", { replace: true });
    }
  }, [isAuthenticated, allowedRoles, navigate, user]);

  // Don't render protected content while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if user doesn't have required role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return null;
  }

  return <Outlet />;
}
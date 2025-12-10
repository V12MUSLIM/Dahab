import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  // Avoid flashing before auth check finishes
  if (!isInitialized) return null;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

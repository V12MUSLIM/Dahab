import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/components/Loading";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, clearAuth } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        clearAuth();
        // Give browser time to store auth cookies
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if user is authenticated
        const user = await checkAuthStatus();

        // Only proceed if the component is still mounted
        if (!isMounted) return;

        if (user) {
          const displayName =
            user.name || user.fullName || user.email || "there";
          toast.success(`Logged in successfully! Welcome ${displayName}`);
          navigate("/", { replace: true });
        } else {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [checkAuthStatus, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading loadingMessage="Completing sign in..." />
    </div>
  );
};

export default AuthCallback;

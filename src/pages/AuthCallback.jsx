import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/components/Loading";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, setUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Auth callback page loaded");

        // Wait a moment for cookies to be set by browser
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check auth status after Google redirects back
        await checkAuthStatus();

        // Wait a bit for state to update
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Navigate to home
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [checkAuthStatus, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading loadingMessage="Completing sign in.." />
    </div>
  );
};

export default AuthCallback;

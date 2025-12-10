import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { flushSync } from "react-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const handleCallback = async () => {
      try {
        const user = await checkAuthStatus();
        if (!mounted) return;

        if (user) {
          const name = user.name || user.fullName || user.email;

          flushSync(() => {
            toast.success(`Logged in successfully! Welcome ${name}`);
          });

          navigate("/", { replace: true });
        } else {
          throw new Error("No user");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        toast.error("Authentication failed.");
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
    return () => {
      mounted = false;
    };
  }, [checkAuthStatus, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading loadingMessage="Completing sign in..." />
    </div>
  );
};

export default AuthCallback;

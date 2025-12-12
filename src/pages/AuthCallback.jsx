import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { flushSync } from "react-dom";
import { authApi } from "@/api/authApi";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const processCallback = async () => {
      try {
        // backend should finalize OAuth login and return full session
        const { data } = await authApi.status();

        if (!mounted) return;

        if (data?.user) {
          flushSync(() => {
            setUser(data.user);
            setAccessToken(data.accessToken || null);

            const name =
              data.user.name || data.user.fullName || data.user.email;

            toast.success(`Logged in successfully! Welcome ${name}`);
          });

          navigate("/", { replace: true });
        } else {
          throw new Error("OAuth callback returned no user");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        toast.error("Authentication failed.");
        navigate("/login", { replace: true });
      }
    };

    processCallback();
    return () => {
      mounted = false;
    };
  }, [navigate, setUser, setAccessToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading loadingMessage="Completing sign in..." />
    </div>
  );
}

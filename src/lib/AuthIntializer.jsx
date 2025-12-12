import { useEffect, useState } from "react";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/components/Loading";

export default function AuthInitializer({ children }) {
  const { setUser, setAccessToken } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const init = async () => {
      try {
        // use refresh token cookie to fetch session
        const { data } = await authApi.status();

        // ✅ FIXED: Check if data exists and has user before setting
        if (active && data?.user) {
          setUser(data.user);
          // Set access token if provided in response
          if (data.accessToken) {
            setAccessToken(data.accessToken);
          }
        }
      } catch (e) {
        // Session invalid or no token → user stays logged out
        // No need to do anything, store already has null values
        console.log("No active session found",e);
      } finally {
        if (active) setReady(true);
      }
    };

    init();
    return () => {
      active = false;
    };
  }, [setUser, setAccessToken]); // ✅ Added dependencies

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading loadingMessage="Loading..." />
      </div>
    );
  }

  return children;
}
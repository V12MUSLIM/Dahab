import React from "react";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { FormInput } from "@/components/customComponents/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/api/axios";
import { Spinner } from "@/components/ui/spinner";
import {
  FormPrimaryButton,
  FormSecondaryButton,
} from "@/components/customComponents/FormButtons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setError, isLoading, setLoading, checkAuthStatus } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Email/Password Login
  const onSubmit = async (formData) => {
    if (
      import.meta.env.DEV &&
      formData.email === "mostafa@dahab.com" &&
      formData.password === "1234678"
    ) {
      useAuthStore.setState({
        user: { email: formData.email, role: "admin" },
        isAuthenticated: true,
      });
      navigate("/dashboard");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await checkAuthStatus();
        toast.success("Login successful!");
        navigate("/");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Redirect
  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('image3.webp')`,
      }}
    >
      {/* Overlay for better contrast with blur */}
      <div className="absolute inset-0 bg-yellow-50/0 dark:bg-black/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Larger Card Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('image3.webp')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/50 dark:from-black/60 dark:via-black/70 dark:to-black/80 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 md:p-16">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-block px-6 py-2 bg-yellow-600 text-white text-base font-semibold rounded-full mb-6">
                Welcome Back
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                Login to Dahab
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Continue your adventure journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <FormInput
                icon={Mail}
                type="email"
                placeholder="Email address"
                error={errors.email}
                register={register("email")}
              />

              {/* Password Input */}
              <FormInput
                icon={Lock}
                type="password"
                placeholder="Password"
                error={errors.password}
                register={register("password")}
              />

              <div className="flex items-center justify-between text-base">
                <label className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="mr-2 rounded w-4 h-4 border-gray-300 dark:border-gray-600"
                  />
                  Remember me
                </label>

                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <FormPrimaryButton
                type="submit"
                disabled={isSubmitting || isLoading}
                className="text-xl"
              >
                {isSubmitting || isLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="w-4 h-4">Logging in...</Spinner>
                  </div>
                ) : (
                  "Login"
                )}
              </FormPrimaryButton>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-4 py-1 text-sm text-gray-700 dark:text-gray-300 bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-full shadow-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              <FormSecondaryButton
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Login with Google
              </FormSecondaryButton>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-700 dark:text-gray-300 text-base">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

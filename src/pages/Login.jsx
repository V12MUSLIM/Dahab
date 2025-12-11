import React from "react";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { FormInput } from "@/components/customComponents/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { authApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  FormPrimaryButton,
  FormSecondaryButton,
} from "@/components/customComponents/FormButtons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      return data;
    },

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      toast.success("Login successful!");
      navigate("/");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (formData) => loginMutation.mutate(formData);
  const isLoading = loginMutation.isPending;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{ backgroundImage: `url('image3.webp')` }}
    >
       <div className="absolute inset-0 bg-yellow-50/0 dark:bg-black/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('image3.webp')` }}
          >
           <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/50 dark:from-black/60 dark:via-black/70 dark:to-black/80 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 p-12 md:p-16">
            <div className="text-center mb-10">
              <div className="inline-block px-6 py-2 bg-yellow-600 text-white text-base font-semibold rounded-full mb-6">
                Welcome Back
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                Login to Dahab
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                icon={Mail}
                type="email"
                placeholder="Email address"
                error={errors.email}
                register={register("email")}
              />

              <FormInput
                icon={Lock}
                type="password"
                placeholder="Password"
                error={errors.password}
                register={register("password")}
              />

              <div className="flex items-center justify-between text-base text-white">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="mr-2 rounded w-4 h-4"
                  />
                  Remember me
                </label>
              </div>

              <FormPrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="w-4 h-4" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </FormPrimaryButton>

              <FormSecondaryButton
                type="button"
                onClick={() =>
                  (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
                }
              >
                Continue with Google
              </FormSecondaryButton>
            </form>

            <div className="mt-8 text-center text-white">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-yellow-400 hover:text-yellow-300 font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

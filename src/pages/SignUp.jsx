import React from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  FormPrimaryButton,
  FormSecondaryButton,
} from "@/components/customComponents/FormButtons";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import api from "@/api/axios";

// Signup Input Component (optimized for signup page styling)
const SignupInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  error,
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-500 z-10" />
        )}
        <Input
          type={inputType}
          placeholder={placeholder}
          {...register}
          className={`pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 h-auto text-base bg-white dark:bg-white/5 border-2 ${
            error
              ? "border-red-500 dark:border-red-500"
              : "border-gray-500 dark:border-white/20"
          } rounded-lg focus-visible:ring-2 focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 z-10 p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const agreedToTerms = watch("agreedToTerms");
  //google signup foraward
  //////////////////////////////////////////////////////////////////
  const handleGoogleSignup = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.open(`${apiUrl}/auth/google`, "_self");
  };
  /////////////////////////////////////////////////////////////////

  const {  checkAuthStatus } = useAuthStore();
  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      await api.post(
        "/auth/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const loginRes = await api.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      return loginRes.data;
    },

    onSuccess: async () => {
      await checkAuthStatus();
      toast.success("Account created successfully!");
      navigate("/");
    },

    onError: (error) => {
      const isLoginError = error.config?.url?.includes("/auth/login");
      const msg = isLoginError
        ? "Account created but auto-login failed. Please log in manually."
        : error.response?.data?.message || "Signup failed.";

      toast.error(msg);
    },
  });

  const isProcessing = isSubmitting || signupMutation.isPending;
  const onSubmit = async (data) => {
    await signupMutation.mutateAsync(data);
    console.log(data);
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center p-3 sm:p-4 relative"
      style={{
        backgroundImage: `url('image4.webp')`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-yellow-50/0 dark:bg-black/80 backdrop-blur-sm"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card with Background Image */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('image4.webp')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/50 dark:from-black/60 dark:via-black/70 dark:to-black/80 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 py-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block px-3 py-1 sm:px-4 bg-yellow-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
                Join Us
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                Create Account
              </h1>
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300">
                Start your Dahab adventure today
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              <SignupInput
                icon={User}
                type="text"
                placeholder="Full name"
                error={errors.fullName}
                register={register("fullName")}
              />

              <SignupInput
                icon={Mail}
                type="email"
                placeholder="Email address"
                error={errors.email}
                register={register("email")}
              />

              <SignupInput
                icon={Lock}
                type="password"
                placeholder="Password"
                error={errors.password}
                register={register("password")}
              />

              <SignupInput
                icon={Lock}
                type="password"
                placeholder="Confirm password"
                error={errors.confirmPassword}
                register={register("confirmPassword")}
              />

              {/* Terms and Conditions */}
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setValue("agreedToTerms", checked)
                    }
                    className="border-2 border-gray-600 data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600 shrink-0 mt-0.5"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 font-semibold underline-offset-2 hover:underline transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 font-semibold underline-offset-2 hover:underline transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                {errors.agreedToTerms && (
                  <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm ml-1">
                    {errors.agreedToTerms.message}
                  </p>
                )}
              </div>

              <FormPrimaryButton
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                aria-busy={isSubmitting}
                icon={isSubmitting ? null : ArrowRight}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="w-4 h-4" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </FormPrimaryButton>

              {/* Elegant Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400/60 dark:border-gray-600/60"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 py-1 text-sm text-gray-700 dark:text-gray-300 bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-gray-800/40 rounded-full shadow-sm">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Google Sign Up Button */}
              <FormSecondaryButton
                type="button"
                onClick={() => handleGoogleSignup()}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0"
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
                <span className="text-xs sm:text-sm"> sign up with Google</span>
              </FormSecondaryButton>
            </form>

            {/* Footer */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 font-semibold cursor-pointer bg-transparent border-none p-0 underline-offset-2 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

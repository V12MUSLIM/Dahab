import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormPrimaryButton,
  FormSecondaryButton,
} from "@/components/customComponents/FormButtons";
import { useNavigate } from "react-router-dom";
// Login Page Component
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('login.webp')`,
      }}
    >
      {/* Overlay for better contrast with blur */}
      <div className="absolute inset-0 bg-yellow-50/60 dark:bg-black/80 backdrop-blur-sm"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Larger Card Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('image1.webp')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/85 to-white/90 dark:from-black/70 dark:via-black/80 dark:to-black/90 backdrop-blur-sm"></div>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400 z-10" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-7 text-lg bg-white/70 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-500 focus-visible:border-yellow-600 dark:focus-visible:border-yellow-500"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400 z-10" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-7 text-lg bg-white/70 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-500 focus-visible:border-yellow-600 dark:focus-visible:border-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 z-10"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-base">
                <label className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 rounded w-4 h-4 border-gray-300 dark:border-gray-600"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <FormPrimaryButton  className="text-xl">Login</FormPrimaryButton>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-4 bg-white/40 dark:bg-black/40 text-gray-700 dark:text-gray-300">
                    Or continue with
                  </span>
                </div>
              </div>

              <FormSecondaryButton
                onClick={() => console.log("Google Sign Up")}
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
                  onClick={() => {
                    navigate("/signup");
                  }}
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

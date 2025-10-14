import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export const FormInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  error,
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400 z-10" />
        )}
        <Input
          type={inputType}
          placeholder={placeholder}
          {...register}
          className={`w-full ${Icon ? "pl-14" : "pl-4"} ${
            type === "password" ? "pr-14" : "pr-4"
          } py-7 text-lg bg-white/70 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-500 focus-visible:border-yellow-600 dark:focus-visible:border-yellow-500 ${
            error ? "border-red-500 dark:border-red-500" : ""
          }`}
          {...props}
        />
        {type === "password" && (
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
        )}
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
};
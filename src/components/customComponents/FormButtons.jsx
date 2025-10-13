import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

/**
 * Shared base className for all form buttons
 */
const baseButtonClasses = cn(
  "w-full flex items-center justify-center gap-2",
  "font-semibold py-5 rounded-xl transition-all duration-300",
  "focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
  "disabled:opacity-70 disabled:cursor-not-allowed"
);

/**
 * Primary form button – solid gradient style for primary actions
 */
const FormPrimaryButton = React.memo(
  React.forwardRef(({ children, className, icon: Icon, type = "submit", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        {...props}
        className={cn(
          baseButtonClasses,
          "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800",
          "text-white shadow-md hover:shadow-yellow-500/30",
          className
        )}
      >
        {children}
        {Icon && <Icon className="w-5 h-5 ml-2" />}
      </Button>
    );
  })
);

FormPrimaryButton.displayName = "FormPrimaryButton";

/**
 * Secondary form button – outline style for secondary actions
 */
const FormSecondaryButton = React.memo(
  React.forwardRef(({ children, className, icon: Icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        {...props}
        className={cn(
          baseButtonClasses,
          "text-gray-900 border border-gray-300 bg-white/30 hover:bg-white/50",
          "dark:text-white dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20",
          "backdrop-blur-sm",
          className
        )}
      >
        {children}
        {Icon && <Icon className="w-5 h-5 ml-2" />}
      </Button>
    );
  })
);

FormSecondaryButton.displayName = "FormSecondaryButton";

export { FormPrimaryButton, FormSecondaryButton };

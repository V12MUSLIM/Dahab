// src/components/customComponents/Toaster.jsx

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export const Toaster = (props) => {
  const { theme = "system", resolvedTheme } = useTheme();
  // Use resolvedTheme to handle "system" correctly
  const isDark = resolvedTheme === "dark";

  const baseStyle = isDark
    ? {
        background: "rgba(35, 30, 20, 0.95)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)", // Safari support
        border: "1px solid rgba(255, 200, 0, 0.5)",
        color: "#fff7d1",
        fontWeight: 500,
        borderRadius: "14px",
        boxShadow: "0 8px 24px rgba(255, 200, 0, 0.18)",
        padding: "12px 18px",
      }
    : {
        background: "rgba(255, 248, 231, 0.95)", // Increased opacity
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 200, 0, 0.4)",
        color: "#3b2f10",
        fontWeight: 500,
        borderRadius: "14px",
        boxShadow: "0 8px 24px rgba(255, 200, 0, 0.25)",
        padding: "12px 18px",
      };

  return (
    <Sonner
      position="top-center"
      expand
      closeButton
      richColors
      duration={4000}
      theme={theme}
      toastOptions={{
        style: baseStyle,
        // Variant-specific styles
        success: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(20, 83, 45, 0.95)",
                border: "1px solid rgba(34, 197, 94, 0.5)",
                color: "#bbf7d0",
                boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)",
              }
            : {
                ...baseStyle,
                background: "rgba(240, 253, 244, 0.95)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#14532d",
                boxShadow: "0 8px 24px rgba(34, 197, 94, 0.25)",
              },
        },
        error: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(127, 29, 29, 0.95)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#fecaca",
                boxShadow: "0 8px 24px rgba(239, 68, 68, 0.15)",
              }
            : {
                ...baseStyle,
                background: "rgba(254, 242, 242, 0.95)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#7f1d1d",
                boxShadow: "0 8px 24px rgba(239, 68, 68, 0.25)",
              },
        },
        warning: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(113, 63, 18, 0.95)",
                border: "1px solid rgba(234, 179, 8, 0.5)",
                color: "#fef08a",
                boxShadow: "0 8px 24px rgba(234, 179, 8, 0.15)",
              }
            : {
                ...baseStyle,
                background: "rgba(254, 249, 195, 0.95)",
                border: "1px solid rgba(234, 179, 8, 0.4)",
                color: "#713f12",
                boxShadow: "0 8px 24px rgba(234, 179, 8, 0.25)",
              },
        },
        info: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(30, 58, 138, 0.95)",
                border: "1px solid rgba(59, 130, 246, 0.5)",
                color: "#bfdbfe",
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.15)",
              }
            : {
                ...baseStyle,
                background: "rgba(239, 246, 255, 0.95)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#1e3a8a",
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.25)",
              },
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-400" />,
        info: <InfoIcon className="size-4 text-sky-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-400" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-amber-400" />,
      }}
      {...props}
    />
  );
};
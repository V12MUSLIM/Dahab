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
        background: "rgba(35, 30, 20, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", // Safari support
        border: "1px solid rgba(255, 200, 0, 0.3)",
        color: "#fff7d1",
        fontWeight: 500,
        borderRadius: "8px",
        padding: "14px 20px",
      }
    : {
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(200, 200, 200, 0.4)",
        color: "#1f2937",
        fontWeight: 500,
        borderRadius: "8px",
        padding: "14px 20px",
      };

  return (
    <Sonner
      position="bottom-right"
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
                background: "rgba(20, 83, 45, 0.75)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#bbf7d0",
              }
            : {
                ...baseStyle,
                background: "rgba(240, 253, 244, 0.65)",
                border: "1px solid rgba(34, 197, 94, 0.5)",
                color: "#14532d",
              },
        },
        error: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(127, 29, 29, 0.75)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fecaca",
              }
            : {
                ...baseStyle,
                background: "rgba(254, 242, 242, 0.65)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#7f1d1d",
              },
        },
        warning: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(113, 63, 18, 0.75)",
                border: "1px solid rgba(234, 179, 8, 0.4)",
                color: "#fef08a",
              }
            : {
                ...baseStyle,
                background: "rgba(254, 249, 195, 0.65)",
                border: "1px solid rgba(234, 179, 8, 0.5)",
                color: "#713f12",
              },
        },
        info: {
          style: isDark
            ? {
                ...baseStyle,
                background: "rgba(30, 58, 138, 0.75)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#bfdbfe",
              }
            : {
                ...baseStyle,
                background: "rgba(239, 246, 255, 0.65)",
                border: "1px solid rgba(59, 130, 246, 0.5)",
                color: "#1e3a8a",
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
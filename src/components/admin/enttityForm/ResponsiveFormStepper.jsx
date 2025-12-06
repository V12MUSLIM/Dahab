import { useState, useEffect } from "react";
import { 
  FormStepper, 
  FormStepperVertical, 
  FormStepperCompact 
} from "./FormStepper";

/**
 * ResponsiveFormStepper
 * 
 * Three goals:
 * - Auto-switch stepper variants based on screen size
 * - Allow custom rules per layout/screen
 * - Provide a predictable default behavior
 * 
 * @param {Array<string>} steps
 * @param {number} currentStep
 * @param {"auto"|"horizontal"|"vertical"|"compact"} variant
 * @param {object} rules - override responsive behavior (mobile/tablet/desktop)
 * @param {string} className
 */
export function ResponsiveFormStepper({
  steps,
  currentStep,
  variant = "auto",
  className = "",
  rules = {
    mobile: "compact",   // <640px
    tablet: "vertical",  // 640–1023px
    desktop: "horizontal"// >=1024px
  }
}) {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Manual override
  if (variant !== "auto") {
    return renderVariant(variant, steps, currentStep, className);
  }

  // Auto mode: choose based on responsive rules
  const chosenVariant = rules[screenSize];
  return renderVariant(chosenVariant, steps, currentStep, className);
}

/**
 * Helper: Render correct stepper by variant name
 */
function renderVariant(variant, steps, currentStep, className) {
  switch (variant) {
    case "compact":
      return (
        <FormStepperCompact
          steps={steps}
          currentStep={currentStep}
          className={className}
        />
      );

    case "vertical":
      return (
        <FormStepperVertical
          steps={steps}
          currentStep={currentStep}
          className={className}
        />
      );

    case "horizontal":
    default:
      return (
        <FormStepper
          steps={steps}
          currentStep={currentStep}
          className={className}
        />
      );
  }
}

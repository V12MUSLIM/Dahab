import { Check } from "lucide-react";

/**
 * FormStepper - A visual stepper component for multi-step forms
 * 
 * @param {Array<string>} steps - Array of step labels
 * @param {number} currentStep - Current active step index (0-based)
 * @param {string} className - Additional CSS classes for container
 */
export function FormStepper({ steps, currentStep, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={label}
            className="flex items-center gap-2 flex-1 min-w-0"
          >
            {/* Step Circle */}
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors
                ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-emerald-50"
                    : "border-muted text-muted-foreground"
                }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
            </div>

            {/* Step Label & Progress Bar */}
            <div className="flex-1 min-w-0">
              <p
                className={`truncate text-sm font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </p>
              <div className="h-1 mt-1 rounded-full bg-muted">
                <div
                  className={`h-1 rounded-full transition-all ${
                    isActive || isCompleted
                      ? "bg-primary w-full"
                      : "bg-transparent w-0"
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * FormStepperVertical - A vertical variant of the stepper
 * 
 * @param {Array<string>} steps - Array of step labels
 * @param {number} currentStep - Current active step index (0-based)
 * @param {string} className - Additional CSS classes for container
 */
export function FormStepperVertical({ steps, currentStep, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={label} className="flex gap-3">
            {/* Step Circle with Connector */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors
                  ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-emerald-50"
                      : "border-muted text-muted-foreground"
                  }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              
              {/* Vertical Line Connector */}
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[40px] transition-colors ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>

            {/* Step Label */}
            <div className="flex-1 pt-1">
              <p
                className={`text-sm font-medium ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * FormStepperCompact - A compact horizontal stepper with just dots
 * 
 * @param {Array<string>} steps - Array of step labels
 * @param {number} currentStep - Current active step index (0-based)
 * @param {string} className - Additional CSS classes for container
 */
export function FormStepperCompact({ steps, currentStep, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={label}
            title={label}
            className={`h-2 rounded-full transition-all ${
              isActive
                ? "w-8 bg-primary"
                : isCompleted
                ? "w-2 bg-emerald-500"
                : "w-2 bg-muted"
            }`}
          />
        );
      })}
    </div>
  );
}
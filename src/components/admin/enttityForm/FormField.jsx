import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Reusable form field component
 * Handles: Input, Textarea, Number inputs with consistent styling
 */
export function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  component = "input", // "input" or "textarea"
  placeholder,
  helpText,
  required = false,
  error,
  rows = 3,
  disabled = false,
  className = "",
}) {
  const isTextarea = component === "textarea";
  const inputType = isTextarea ? undefined : type;

  // Handle the change - pass the full event object
  const handleChange = (e) => {
    onChange(e); // Just pass the event directly to parent handler
  };

  const InputComponent = isTextarea ? Textarea : Input;

  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <InputComponent
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={isTextarea ? rows : undefined}
        disabled={disabled}
        className={error ? "border-destructive" : ""}
        
      />

      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
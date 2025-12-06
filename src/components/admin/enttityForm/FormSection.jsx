import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * FormSection - A reusable component for organizing form fields into logical sections
 * 
 * @param {string} title - Section heading (optional)
 * @param {string} description - Section description text (optional)
 * @param {React.ReactNode} children - Form fields or content
 * @param {boolean} withSeparator - Show separator before section (default: false)
 * @param {string} className - Additional CSS classes
 */
export function FormSection({
  title,
  description,
  children,
  withSeparator = false,
  className,
}) {
  return (
    <>
      {withSeparator && <Separator />}
      
      <div className={cn("space-y-4", className)}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </>
  );
}
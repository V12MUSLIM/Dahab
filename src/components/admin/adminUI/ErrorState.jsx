import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({ error, onRetry, message = "Error loading data" }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">{message}</h2>
        </div>
        <p className="text-slate-600 dark:text-gray-400 mb-4">
          {error?.message || "Please try again."}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="w-full">
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
}
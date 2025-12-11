import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Data"}) {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="animate-spin h-10 w-10 text-primary" />
            <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">Loading {message}</p>
            <p className="text-sm text-muted-foreground">
              Fetching your {message}...
            </p>
          </div>
        </div>
      </div>
    );
}
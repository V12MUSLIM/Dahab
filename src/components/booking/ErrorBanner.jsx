
import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="w-5 h-5 text-red-600" />
      <p className="text-sm text-red-600">{text}</p>
    </div>
  );
}

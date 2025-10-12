// API Error Component
// You can pass a `message` prop to display a custom error message.

import { TriangleAlert, RotateCcw } from "lucide-react";
import { PrimaryButton } from "../customComponents/ButtonVarients";
export default function ApiError({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="text-center space-y-4 max-w-md"
        role="alert"
        aria-live="assertive"
      >
        <TriangleAlert className="w-14 h-14 text-red-600 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-white">
          {message || "We couldn't load the content. Please try again later."}
        </p>
        <PrimaryButton
          onClick={() => window.location.reload()}
          icon={RotateCcw}
        >
          Refresh Page
        </PrimaryButton>
      </div>
    </div>
  );
}

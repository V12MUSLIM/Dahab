import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ErrorBanner({ text, onDismiss, dismissible = true }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!text || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-3 p-4 
                   bg-red-50 dark:bg-red-900/20 
                   border border-red-200 dark:border-red-800/40 
                   rounded-lg shadow-sm
                   backdrop-blur-sm"
        role="alert"
      >
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        
        <p className="flex-1 text-sm font-medium text-red-800 dark:text-red-200 leading-relaxed">
          {text}
        </p>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="text-red-600 dark:text-red-400 
                       hover:text-red-800 dark:hover:text-red-200 
                       hover:bg-red-100 dark:hover:bg-red-900/30
                       rounded p-1
                       transition-all duration-200"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

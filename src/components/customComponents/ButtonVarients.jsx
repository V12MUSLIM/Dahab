import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const MotionButton = motion.create(Button);

const PrimaryButton = ({ children, className, icon: Icon }) => {
  return (
    <MotionButton
      size="lg"
      className={cn(
        "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 dark:from-yellow-600 dark:to-yellow-700 dark:hover:from-yellow-700 dark:hover:to-yellow-800 text-white font-semibold px-8 py-6  shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 border-0 group w-full sm:w-auto",
        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {Icon && (
        <Icon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </MotionButton>
  );
};
const SecondaryButton = ({ children, className, icon: Icon }) => {
  return (
    <MotionButton
      size="lg"
      variant="outline"
      className={cn(
        "text-gray-900 border border-gray-300 bg-white/40 hover:bg-white/60 dark:text-white dark:border-white/40 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md font-semibold px-8 py-6 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto cursor-pointer",

        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {Icon && (
        <Icon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </MotionButton>
  );
};
export { PrimaryButton, SecondaryButton };


import { motion } from "framer-motion";

export default function BookingStepsNav({ steps, currentStep }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 min-w-max">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.id ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </motion.div>
            <p className={`ml-2 text-sm ${currentStep >= step.id ? "text-yellow-600" : "text-gray-400"}`}>
              {step.title}
            </p>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-2 ${currentStep > step.id ? "bg-yellow-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

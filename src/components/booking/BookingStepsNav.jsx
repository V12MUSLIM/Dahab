import { motion } from "framer-motion";

export default function BookingStepsNav({ steps, currentStep }) {
  return (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-orange-500/20 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <li key={step.id} className="flex items-center flex-1 relative">
                {/* Step Circle and Label */}
                <div className="flex flex-col items-center relative z-10">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: isCurrent ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center
                      transition-all duration-300 border-2
                      ${isCompleted
                        ? "bg-amber-500 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-600 dark:text-white"
                        : isCurrent
                        ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30 dark:bg-amber-500 dark:border-amber-500 dark:text-white dark:shadow-amber-500/30"
                        : "bg-gray-100 border-gray-300 text-gray-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <step.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                    )}
                  </motion.div>

                  {/* Step Title */}
                  <p className={`
                    mt-3 text-xs sm:text-sm font-medium text-center whitespace-nowrap
                    transition-colors duration-300
                    ${isCompleted || isCurrent
                      ? "text-amber-600 dark:text-amber-500" 
                      : "text-gray-500 dark:text-gray-400"
                    }
                  `}>
                    {step.title}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-3 sm:mx-4 relative" style={{ top: '-24px' }}>
                    <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full" />
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-amber-500 dark:bg-amber-500 rounded-full"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

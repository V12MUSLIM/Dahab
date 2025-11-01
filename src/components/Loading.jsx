import React from "react";

const DahabLoader = ({ loadingMessage = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center space-y-12 px-4">
      {/* Animated Circle Spinner */}
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div
          className="
            absolute inset-0 
            rounded-full border-2 
            border-amber-600/30 dark:border-amber-400/30 
            border-t-amber-600 dark:border-t-amber-400 
            animate-[spin_3s_linear_infinite]
          "
        />

        {/* Inner pulse circle */}
        <div
          className="
            absolute inset-3 
            rounded-full 
            bg-amber-600/10 dark:bg-amber-400/10 
            animate-[pulse_2s_ease-in-out_infinite]
          "
        />
      </div>

      {/* Brand Name */}
      <div className="text-center space-y-3">
        <h1
          className="
            text-5xl font-light tracking-[0.4em] 
            text-slate-900 dark:text-slate-100 
            animate-[fadeIn_1s_ease-in-out]
          "
        >
          DAHAB
        </h1>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-600 to-transparent dark:via-amber-400" />
        <p
          className="
            text-xs font-semibold tracking-[0.3em] 
            text-black dark:text-white 
            animate-[fadeIn_1s_ease-in-out_0.2s_both]
          "
        >
          {loadingMessage}
        </p>
      </div>
    </div>
  );
};

export default DahabLoader;

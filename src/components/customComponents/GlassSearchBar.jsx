"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function GlassSearchBar({ placeholder = "Search destinations..." }) {
  const [active, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true);
    document.body.style.overflow = "hidden"; // disable scroll
  };

  const handleBlur = () => {
    setActive(false);
    document.body.style.overflow = ""; // restore scroll
  };

  return (
    <>
      {/* Background Blur Overlay */}
      <div
        className={`fixed inset-0 z-10 transition-all duration-700 pointer-events-none ${
          active ? "backdrop-blur-lg scale-[1.02]" : "backdrop-blur-0 scale-100"
        }`}
      />

      {/* Glass Gold Search Bar */}
      <motion.div
        animate={{
          y: active ? -20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 16,
        }}
        className="relative z-30 flex justify-center mt-10"
      >
        <div
          className="relative w-full max-w-lg 
                     rounded-full border border-yellow-400/40
                     bg-white/10 backdrop-blur-2xl
                     transition-all duration-500"
        >
          <input
            type="text"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-3 pl-5 pr-14 text-lg text-white placeholder-white/70
                       bg-transparent rounded-full focus:outline-none
                       focus:ring-2 focus:ring-yellow-400/70 transition-all duration-300"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 
                       p-3 rounded-full 
                       bg-gradient-to-r from-yellow-500 to-yellow-600 
                       hover:from-yellow-400 hover:to-yellow-500 
                       shadow-[0_0_20px_rgba(255,215,0,0.4)] 
                       transition-all duration-300"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>
    </>
  );
}

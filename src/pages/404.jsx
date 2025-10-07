"use client";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-center px-6">
      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[10rem] sm:text-[12rem] font-extrabold text-amber-500 drop-shadow-[0_0_20px_rgba(255,191,0,0.3)]"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4"
      >
        Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-gray-500 dark:text-gray-400 max-w-md mb-8"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-500/50
          text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-500/10
          dark:hover:bg-amber-400/10 transition-all duration-300"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Sun,
  Anchor,
  Star,
} from "lucide-react";

export default function HeroSection() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with better contrast */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}hero.png`}
          alt="Dahab"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>

      {/* Enhanced overlay for better text visibility */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 dark:from-black/50 dark:via-black/60 dark:to-black/80 z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Content with floating badge */}
      <motion.div
        className="relative z-10 text-center text-white max-w-4xl px-4 mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={floatAnimation}
          animate="animate"
          className="inline-block mb-6"
        >
          <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Egypt's Hidden Gem
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
          variants={fadeInUp}
        >
          Dahab
        </motion.h1>

        <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-100 font-light tracking-wide leading-relaxed drop-shadow-lg max-w-3xl mx-auto px-4"
          variants={fadeInUp}
        >
          Red Sea Paradise — Where Adventure, Relaxation, and Culture Unite
        </motion.p>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={scaleIn}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 dark:from-yellow-600 dark:to-yellow-700 dark:hover:from-yellow-700 dark:hover:to-yellow-800 text-white font-semibold px-8 py-6 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 border-0 group w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-900 border border-gray-300 bg-white/40 hover:bg-white/60
               dark:text-white dark:border-white/40 dark:bg-white/10 dark:hover:bg-white/20
               backdrop-blur-md font-semibold px-8 py-6 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Plan Your Trip
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/90 px-4"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">330+ Sunny Days</span>
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">25+ Dive Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
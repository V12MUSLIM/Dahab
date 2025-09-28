import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/customComponents/ButtonVarients";
import { Badge } from "../components/ui/badge";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PackageDealsSection from "@/components/sections/PackageDealsSection";
import { Sparkles, Sun, Anchor, Star, PlayIcon } from "lucide-react";

export default function PlantTrip() {
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
  const packages = [
    {
      title: "Adventure Seeker",
      price: "$299",
      duration: "3 Days",
      features: [
        "Blue Hole diving experience",
        "Desert safari with Bedouin dinner",
        "Snorkeling at Three Pools",
        "Rock climbing session",
        "All equipment included",
      ],
      popular: true,
    },
    {
      title: "Relaxation Retreat",
      price: "$249",
      duration: "4 Days",
      features: [
        "Beachfront accommodation",
        "Daily yoga sessions",
        "Spa treatment package",
        "Lagoon day trip",
        "Sunset meditation",
      ],
      popular: false,
    },
    {
      title: "Ultimate Explorer",
      price: "$599",
      duration: "7 Days",
      features: [
        "Advanced diving package",
        "Mount Sinai overnight trek",
        "Colored Canyon expedition",
        "Windsurfing lessons",
        "Photography workshop",
      ],
      popular: false,
    },
  ];
  return (
    <>
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with better contrast */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}image1.jpeg`}
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
              Your Adventure await
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
            variants={fadeInUp}
          >
            Plan Your Trip
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
              <PrimaryButton>Start Now</PrimaryButton>
            </motion.div>
            <motion.div variants={scaleIn}>
              <SecondaryButton icon={PlayIcon}>Watch Video</SecondaryButton>
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
      <section>
        <PackageDealsSection
          packages={packages}
          badge="Spechial ffers"
          header="Exclusive Packages Deals"
          description="   Choose from our carefully curated packages for an unforgettable
                   Dahab experience"
        />
      </section>
    </>
  );
}

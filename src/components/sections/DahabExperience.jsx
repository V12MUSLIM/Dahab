import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import {
  PrimaryButton,
  SecondaryButton,
} from "../customComponents/ButtonVarients";
// Word Rotate Component
function WordRotate({ words, className = "", interval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function DahabExperience() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-muted/80 dark:bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-32">
        {/* First Part - From Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Discover the{" "}
              <span className="text-yellow-500 font-medium">beautiful</span>{" "}
              side of Dahab
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Dive into crystal-clear waters and discover underwater paradise
              where vibrant marine life awaits.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="beautiful.png"
                alt="Beautiful coral reefs"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Second Part - From Left */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="adventure.png"
                alt="Adventure activities"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Endless{" "}
              <span className="text-yellow-500 font-medium">adventure</span>{" "}
              awaits you here
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              From desert safaris to water sports, every moment is filled with
              thrilling experiences.
            </p>
          </motion.div>
        </div>

        {/* Third Part - From Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              World-famous{" "}
              <span className="text-yellow-500 font-medium">Blue Hole</span>{" "}
              diving site
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Explore one of the most legendary dive sites in the world, where
              experienced divers come to witness the mesmerizing underwater
              canyon.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="blueHole.png"
                alt="Blue Hole diving site"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Fourth Part - From Left */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="discover.png"
                alt="Sinai mountains and desert landscape"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Majestic{" "}
              <span className="text-yellow-500 font-medium">
                Sinai mountains
              </span>{" "}
              backdrop
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Experience the stunning contrast of golden desert mountains
              meeting the turquoise Red Sea, creating a landscape unlike
              anywhere else on Earth.
            </p>
          </motion.div>
        </div>

        {/* Fifth Part - From Bottom */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] p-12 sm:p-16 lg:p-24 ">
            {/* Content */}
            <div className="relative z-10 text-center space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm mb-4">
                <span className="text-yellow-600 dark:text-yellow-500 text-sm font-medium tracking-wide">
                  Where Adventure Begins
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900 dark:text-white leading-[1.15] tracking-tight max-w-4xl mx-auto">
                Where golden sands embrace azure waters, and every sunset paints{" "}
                <WordRotate
                  words={[
                    "unforgettable",
                    "magical",
                    "timeless",
                    "extraordinary",
                    "breathtaking",
                  ]}
                  className="text-yellow-600 dark:text-yellow-500 font-medium"
                  interval={2500}
                />{" "}
                memories
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Dahab is more than a destination—it's a symphony of nature,
                culture, and adventure that captures the soul of every traveler
                who discovers its shores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <PrimaryButton> Plan Your Journey</PrimaryButton>
                <SecondaryButton> Explore Experiences</SecondaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

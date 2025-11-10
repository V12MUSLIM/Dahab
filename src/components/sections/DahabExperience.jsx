import { useState, useEffect, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Waves, Mountain, Compass, Sparkles } from "lucide-react";
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

// Animated Icon Component
// eslint-disable-next-line no-unused-vars
function TimelineIcon({ icon: Icon, progress, threshold }) {
  const circleScale = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.05],
    [0, 1.3, 1]
  );

  const iconOpacity = useTransform(
    progress,
    [threshold - 0.03, threshold],
    [0, 1]
  );

  const iconScale = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.05],
    [0.5, 1.2, 1]
  );

  return (
    <div className="relative flex items-center justify-center">
      {/* Expanding ring */}
      <motion.div
        className="absolute w-16 h-16 border-4 border-yellow-400/80 rounded-full"
        style={{
          scale: circleScale,
          opacity: iconOpacity,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />
      {/* Icon bubble */}
      <motion.div
        className="relative w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30"
        style={{ opacity: iconOpacity, scale: iconScale }}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}

export default function DahabExperience() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "80% end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 bg-muted/80 dark:bg-muted/40 relative"
    >
      {/* Animated Vertical Line */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 pointer-events-none"
        style={{ bottom: "20%" }}
      >
        {/* Background line */}
        <div className="absolute inset-0 w-px -translate-x-1/2 opacity-20">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="12 12"
              className="text-yellow-500"
            />
          </svg>
        </div>

        {/* Animated progress line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px overflow-hidden"
          style={{
            height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          }}
        >
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="12 12"
              className="text-yellow-500"
              style={{
                filter: "drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))",
              }}
            />
          </svg>
        </motion.div>

        {/* Animated scroll dot */}
        <motion.div
          className="absolute w-4 h-4 bg-yellow-500 rounded-full left-1/2 -translate-x-1/2 shadow-lg shadow-yellow-500/50"
          style={{
            top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            scale: useTransform(
              smoothProgress,
              [0, 0.02, 0.98, 1],
              [0, 1, 1, 0]
            ),
          }}
        >
          <motion.div
            className="absolute inset-0 bg-yellow-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Timeline icons */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "18%" }}
        >
          <TimelineIcon icon={Waves} progress={smoothProgress} threshold={0.18} />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "40%" }}
        >
          <TimelineIcon icon={Compass} progress={smoothProgress} threshold={0.4} />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "63%" }}
        >
          <TimelineIcon icon={Sparkles} progress={smoothProgress} threshold={0.63} />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "85%" }}
        >
          <TimelineIcon icon={Mountain} progress={smoothProgress} threshold={0.85} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48">
        {/* First Part */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-5xl font-semibold text-slate-900 dark:text-white leading-tight">
              Discover the{" "}
              <span className="text-yellow-500 font-medium">beautiful</span> side
              of Dahab
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
              Dive into crystal-clear waters and discover underwater paradise
              where vibrant marine life awaits.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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

        {/* Second Part */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-5xl font-semibold text-slate-900 dark:text-white leading-tight">
              Endless{" "}
              <span className="text-yellow-500 font-medium">adventure</span> awaits
              you here
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
              From desert safaris to water sports, every moment is filled with
              thrilling experiences.
            </p>
          </motion.div>
        </div>

        {/* Third Part */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-5xl font-semibold text-slate-900 dark:text-white leading-tight">
              World-famous{" "}
              <span className="text-yellow-500 font-medium">Blue Hole</span>{" "}
              diving site
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
              Explore one of the most legendary dive sites in the world, where
              experienced divers come to witness the mesmerizing underwater canyon.
            </p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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

        {/* Fourth Part */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="discover.png"
                alt="Sinai mountains"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-5xl font-semibold text-slate-900 dark:text-white leading-tight">
              Majestic{" "}
              <span className="text-yellow-500 font-medium">Sinai mountains</span>{" "}
              backdrop
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
              Experience the stunning contrast of golden desert mountains meeting
              the turquoise Red Sea, creating a landscape unlike anywhere else on
              Earth.
            </p>
          </motion.div>
        </div>

        {/* Final CTA Section */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] p-12 sm:p-16 lg:p-24">
            <div className="relative z-10 text-center space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm mb-4">
                <span className="text-yellow-600 dark:text-yellow-500 text-sm font-medium tracking-wide">
                  Where Adventure Begins
                </span>
              </div>

              <h2 className="text-5xl font-semibold text-slate-900 dark:text-white leading-tight max-w-4xl mx-auto">
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

              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                Dahab is more than a destination—it's a symphony of nature,
                culture, and adventure that captures the soul of every traveler who
                discovers its shores.
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

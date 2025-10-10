import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

// Animation constants
const FADE_DURATION = 0.8;
const SCALE_DURATION = 0.6;
const STAGGER_DELAY = 0.15;
const FLOAT_DURATION = 3;

export default function HeroSection({
  image,
  title = "Your Hero Title",
  subtitle = "Your subtitle goes here...",
  Icon,
  badge,
  primaryCta,
  secondaryCta = { label: "Learn More", href: "#" },
  PrimaryButton,
  SecondaryButton,
  stats = [],
  imageURL,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Animation variants - properly structured
  const fadeInUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: STAGGER_DELAY },
    },
  };

  const scaleIn = {
    initial: { scale: shouldReduceMotion ? 1 : 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -10, 0],
          transition: {
            duration: FLOAT_DURATION,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        },
      };

  const imageAnimation = shouldReduceMotion
    ? { opacity: imageLoaded ? 1 : 0 }
    : {
        initial: { scale: 1.2, opacity: 0 },
        animate: { scale: 1, opacity: imageLoaded ? 1 : 0 },
      };

  // Helper component for CTA buttons
  const CTAButton = ({ cta, Button, variants }) => {
    if (!cta || !Button) return null;

    const buttonContent = (
      <Button icon={cta.icon} onClick={cta.onClick}>
        {cta.label}
      </Button>
    );

    return (
      <motion.div variants={variants}>
        {cta.href ? <Link to={cta.href}>{buttonContent}</Link> : buttonContent}
      </motion.div>
    );
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={
            imageURL
              ? imageURL 
              : image
              ? `${import.meta.env.BASE_URL}${image}` 
              : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
          }
          alt={`${title} background`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          {...imageAnimation}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 dark:from-black/50 dark:via-black/60 dark:to-black/80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: FADE_DURATION, delay: 0.2 }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center text-white max-w-4xl px-4 mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Floating Badge */}
        {(Icon || badge) && (
          <motion.div {...floatAnimation} className="inline-block mb-6">
            <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0 px-4 py-2 text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className=" text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
          variants={fadeInUp}
          transition={{ duration: FADE_DURATION, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-100 font-light tracking-wide leading-relaxed drop-shadow-lg max-w-3xl mx-auto px-4"
            variants={fadeInUp}
            transition={{
              duration: FADE_DURATION,
              ease: "easeOut",
              delay: 0.1,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
            variants={staggerContainer}
          >
            <CTAButton
              cta={primaryCta}
              Button={PrimaryButton}
              variants={scaleIn}
            />
            <CTAButton
              cta={secondaryCta}
              Button={SecondaryButton}
              variants={scaleIn}
            />
          </motion.div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/90 px-4"
            variants={fadeInUp}
            transition={{
              duration: FADE_DURATION,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {stat.icon && (
                  <stat.icon
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  />
                )}
                <span className="text-sm font-medium">{stat.text}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

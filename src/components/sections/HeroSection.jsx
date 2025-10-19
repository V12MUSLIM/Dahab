// components/sections/HeroSection.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Sun, Anchor, Star, ArrowRight, Calendar, Waves, Camera, Mountain,
  CheckCircle, MapPin, Plane,
} from "lucide-react";

const FADE_DURATION = 0.8;
const STAGGER_DELAY = 0.15;
const FLOAT_DURATION = 3;

const iconMap = {
  Sun, Anchor, Star, ArrowRight, Calendar, Waves, Camera, Mountain, CheckCircle, MapPin, Plane,
};

const resolveIcon = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") return iconMap[icon] || null;
  return icon;
};

const CTAButton = ({ cta, Button, variants }) => {
  if (!cta || !cta.label || !Button) return null;

  const Icon = resolveIcon(cta.icon);

  const handleClick = (e) => {
    if (cta.href?.startsWith("#")) {
      e.preventDefault();
      const id = cta.href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    cta.onClick?.(e);
  };

  // External link
  if (/^https?:\/\//i.test(cta.href ?? "")) {
    return (
      <motion.div variants={variants}>
        <Button asChild>
          <a href={cta.href} target="_blank" rel="noopener noreferrer" aria-label={cta.label}>
            {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
            {cta.label}
          </a>
        </Button>
      </motion.div>
    );
  }

  // Internal route
  if (cta.href && !cta.href.startsWith("#")) {
    return (
      <motion.div variants={variants}>
        <Button asChild>
          <Link to={cta.href} aria-label={cta.label}>
            {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
            {cta.label}
          </Link>
        </Button>
      </motion.div>
    );
  }

  // Hash or no href
  return (
    <motion.div variants={variants}>
      <Button onClick={handleClick} aria-label={cta.label}>
        {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
        {cta.label}
      </Button>
    </motion.div>
  );
};

export default function HeroSection({
  image,
  title = "Your Hero Title",
  highlight,
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
  const ResolvedIcon = resolveIcon(Icon);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 120], { clamp: true });

  const fadeInUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    animate: { opacity: 1, y: 0 },
  };
  const staggerContainer = {
    initial: {},
    animate: { transition: { staggerChildren: STAGGER_DELAY } },
  };
  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -10, 0],
          transition: { duration: FLOAT_DURATION, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        },
      };
  const imageAnimation = shouldReduceMotion
    ? { opacity: imageLoaded ? 1 : 0 }
    : { initial: { scale: 1.2, opacity: 0 }, animate: { scale: 1, opacity: imageLoaded ? 1 : 0 } };

  const hasPrimary = !!(primaryCta && primaryCta.label);
  const hasSecondary = !!(secondaryCta && secondaryCta.label);
  const showCtas = hasPrimary || hasSecondary;

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with Parallax */}
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
          style={{ y: yParallax }}
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
        {(ResolvedIcon || badge) && (
          <motion.div {...floatAnimation} className="inline-block mb-6">
            <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0 px-4 py-2 text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
              {ResolvedIcon && <ResolvedIcon className="w-4 h-4" aria-hidden="true" />}
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
          variants={fadeInUp}
          transition={{ duration: FADE_DURATION, ease: "easeOut" }}
        >
          <span>
            {title} {highlight && <span className="text-amber-500">{highlight}</span>}
          </span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-100 font-light tracking-wide leading-relaxed drop-shadow-lg max-w-3xl mx-auto px-4"
            variants={fadeInUp}
            transition={{ duration: FADE_DURATION, ease: "easeOut", delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {showCtas && (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            {hasPrimary && <CTAButton cta={primaryCta} Button={PrimaryButton} variants={fadeInUp} />}
            {hasSecondary && <CTAButton cta={secondaryCta} Button={SecondaryButton} variants={fadeInUp} />}
          </motion.div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/90 px-4"
            variants={fadeInUp}
            transition={{ duration: FADE_DURATION, ease: "easeOut", delay: 0.2 }}
          >
            {stats.map((stat, idx) => {
              const StatIcon = resolveIcon(stat.icon);
              return (
                <div key={idx} className="flex items-center gap-2">
                  {StatIcon && <StatIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />}
                  <span className="text-sm font-medium">{stat.text}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

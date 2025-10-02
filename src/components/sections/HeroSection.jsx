import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HeroSection({
  image,
  title = "Your Hero Title",
  subtitle = "Your subtitle goes here...",
  Icon,
  badge,
  primaryCta = { label: "Get Started", href: "#" },
  secondaryCta = { label: "Learn More", href: "#" },
  PrimaryButton,
  SecondaryButton,
  stats = [],
}) {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.15 },
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
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
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
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 dark:from-black/50 dark:via-black/60 dark:to-black/80 z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-4xl px-4 mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Floating Badge */}
        {(Icon || badge) && (
          <motion.div
            variants={floatAnimation}
            animate="animate"
            className="inline-block mb-6"
          >
            <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0 px-4 py-2 text-sm font-semibold backdrop-blur-sm flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
          variants={fadeInUp}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-100 font-light tracking-wide leading-relaxed drop-shadow-lg max-w-3xl mx-auto px-4"
            variants={fadeInUp}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Primary CTA */}
            {primaryCta && PrimaryButton && (
              <motion.div variants={scaleIn}>
                {primaryCta.href ? (
                  <Link to={primaryCta.href}>
                    <PrimaryButton icon={primaryCta.icon}>
                      {primaryCta.label}
                    </PrimaryButton>
                  </Link>
                ) : (
                  <PrimaryButton
                    icon={primaryCta.icon}
                    onClick={primaryCta.onClick}
                  >
                    {primaryCta.label}
                  </PrimaryButton>
                )}
              </motion.div>
            )}

            {/* Secondary CTA */}
            {secondaryCta && SecondaryButton && (
              <motion.div variants={scaleIn}>
                {secondaryCta.href ? (
                  <Link to={secondaryCta.href}>
                    <SecondaryButton icon={secondaryCta.icon}>
                      {secondaryCta.label}
                    </SecondaryButton>
                  </Link>
                ) : (
                  <SecondaryButton
                    icon={secondaryCta.icon}
                    onClick={secondaryCta.onClick}
                  >
                    {secondaryCta.label}
                  </SecondaryButton>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/90 px-4"
            variants={fadeInUp}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {stat.icon && <stat.icon className="w-5 h-5 text-yellow-400" />}
                <span className="text-sm font-medium">{stat.text}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

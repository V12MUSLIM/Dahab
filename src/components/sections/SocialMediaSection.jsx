"use client";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { useSocials } from "@/hooks/useSocials";

export default function SocialMediaSection({
  badge = "",
  header,
  description,
  id,
}) {
  const {
    socialsQuery: { data: socialMedia = [], isLoading, isError, error },
  } = useSocials();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner className="w-8 h-8 text-yellow-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load social media: {error?.message}
      </p>
    );
  }
  

  return (
    <section id={id} className="py-20 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 px-4 py-1.5 shadow-sm">
            {badge}
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            {header}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6">
          {socialMedia.map((social, index) => (
            <motion.a
              key={social.name || index}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-14 h-14 rounded-full overflow-visible group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 rounded-full ${social.label} opacity-30 blur-xl`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              {/* Icon Background */}
              <div
                className="relative h-14 w-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
                style={{
                  background: social.color, // "#FF4500"
                }}
              >
                <motion.img
                  loading="lazy"
                  src={social.icon}
                  alt={social.name}
                  className="h-6 w-6 object-contain filter brightness-0 invert"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onError={(e) => {
                    e.target.src = "/fallback-icon.svg";
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

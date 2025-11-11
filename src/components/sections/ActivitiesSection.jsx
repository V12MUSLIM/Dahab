import { Badge } from "../ui/badge";
import { ActivityCard } from "../customComponents/cardTemplates";
import { motion } from "framer-motion";
import { FormPrimaryButton } from "../customComponents/FormButtons";
import { ROUTES } from "@/config/SiteConfig";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export default function ActivitiesSection({
  badge,
  header,
  description,
  activities = [],
}) {
  if (!activities.length) return null;

  return (
    <div className="flex flex-col">
      <motion.section
        className="bg-muted/30 dark:bg-muted/0 py-20 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // 👈 triggers once as soon as 20% enters view
        transition={{ duration: 0.5, ease: "easeOut" }} // 👈 short + snappy
      >
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
                {badge}
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {header}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            </motion.div>

            {/* Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id || `activity-${index}`}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityCard
                    title={activity.title}
                    description={activity.description}
                    icon={activity.icon}
                    duration={activity.duration}
                    groupSize={activity.groupSize}
                    difficulty={activity.difficulty}
                    price={activity.price}
                    image="cardBg.png"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
      <div className="w-full flex justify-center items-center">
        <NavLink to={ROUTES.experiences}>
          <FormPrimaryButton className="px-24 py-6 text-lg sm:text-xl rounded-xl shadow-md">
            View all <ChevronRight />
          </FormPrimaryButton>
        </NavLink>
      </div>
    </div>
  );
}

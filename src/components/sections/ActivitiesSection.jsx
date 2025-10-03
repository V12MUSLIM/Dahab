import { Badge } from "../ui/badge";
import { ActivityCard } from "../customComponents/cardTemplates";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Animation constants
const ANIMATION_DURATION = 0.8;
const STAGGER_DELAY = 0.1;
const HOVER_Y_OFFSET = -5;
const INITIAL_Y_OFFSET = 20;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION,
      staggerChildren: STAGGER_DELAY,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: INITIAL_Y_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ActivitiesSection({
  badge,
  header,
  description,
  activities = [],
}) {
  // Handle empty activities array
  if (!activities.length) {
    return null;
  }

  return (
    <motion.div
      className="bg-muted/30 dark:bg-muted/20 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              {badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {header}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id || `activity-${index}`}
                variants={itemVariants}
                whileHover={{ y: HOVER_Y_OFFSET }}
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
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
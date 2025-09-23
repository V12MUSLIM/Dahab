import { Badge } from "../ui/badge";
import { ActivityCard } from "../cardTemplates";
import { Waves, Camera, Mountain } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivitiesSection() {
  const activities = [
    {
      title: "Scuba Diving",
      description: "Explore the underwater paradise of the Red Sea with professional guides",
      icon: Waves,
      duration: "Half Day",
      groupSize: "8 people",
      difficulty: "All Levels",
      price: "$75"
    },
    {
      title: "Desert Safari",
      description: "Experience authentic Bedouin culture on a magical desert journey",
      icon: Camera,
      duration: "Full Day",
      groupSize: "12 people",
      difficulty: "Easy",
      price: "$60"
    },
    {
      title: "Rock Climbing",
      description: "Challenge yourself on the stunning limestone cliffs of South Sinai",
      icon: Mountain,
      duration: "4 hours",
      groupSize: "6 people",
      difficulty: "Intermediate",
      price: "$65"
    },
    {
      title: "Windsurfing",
      description: "Perfect winds and conditions make Dahab a windsurfing paradise",
      icon: Waves,
      duration: "3 hours",
      groupSize: "4 people",
      difficulty: "Beginner+",
      price: "$50"
    }
  ];

  return (
    <motion.div
      className="bg-muted/30 dark:bg-muted/20 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              Activities
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Adventures Await
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              From underwater exploration to desert adventures, discover the
              activities that make Dahab special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.title}
                whileHover={{ y: -5 }} 
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${index * 0.1}s` }}
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
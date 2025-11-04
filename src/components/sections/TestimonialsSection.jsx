import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TestimonialCard({ name, location, avatar, comment, rating = 5, className }) {
  return (
    <Card className={cn(
      "relative h-full p-8 border border-border hover:border-yellow-400/50 transition-colors duration-300 bg-card",
      className
    )}>
      {/* Large quote icon */}
      <Quote className="w-10 h-10 text-yellow-500/20 mb-4" />

      {/* Content as main focus */}
      <p className="text-foreground text-lg leading-relaxed mb-6">
        {comment}
      </p>

      {/* Bottom section with avatar and rating */}
      <div className="flex items-center justify-between pt-4 border-t border-yellow-400/20">
        <div className="flex items-center gap-3">
          {avatar && (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-medium text-foreground text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>

        {/* Compact rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5",
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
              strokeWidth={i < rating ? 0 : 1}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Adventure Traveler",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      comment:
        "Dahab exceeded all my expectations! The diving at the Blue Hole was absolutely incredible, and the local hospitality made me feel right at home.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Professional Photographer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      comment:
        "As a photographer, Dahab is a dream destination. The contrast between the desert and sea creates stunning compositions. The sunrise from Mount Sinai is unforgettable!",
      rating: 5,
    },
    {
      name: "Emma Martinez",
      location: "Yoga Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      comment:
        "The perfect blend of adventure and relaxation. Morning yoga by the sea, afternoon diving, and evenings under the stars. Dahab has stolen my heart!",
      rating: 5,
    },
  ];

  return (
    <motion.div
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Visitors Say
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Real experiences from travelers who discovered the magic of Dahab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name={t.name}
                  location={t.location}
                  avatar={t.avatar}
                  comment={t.comment}
                  rating={t.rating}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

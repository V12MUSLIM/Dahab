import { Badge } from "../ui/badge";
import { TestimonialCard } from "../cardTemplates";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Dahab exceeded all my expectations! The diving at the Blue Hole was absolutely incredible, and the local hospitality made me feel right at home.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Professional Photographer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      content: "As a photographer, Dahab is a dream destination. The contrast between the desert and sea creates stunning compositions. The sunrise from Mount Sinai is unforgettable!",
      rating: 5
    },
    {
      name: "Emma Martinez",
      role: "Yoga Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      content: "The perfect blend of adventure and relaxation. Morning yoga by the sea, afternoon diving, and evenings under the stars. Dahab has stolen my heart!",
      rating: 5
    }
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
              Real experiences from travelers who discovered the magic of
              Dahab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  avatar={testimonial.avatar}
                  content={testimonial.content}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
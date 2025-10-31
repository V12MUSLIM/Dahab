import { PrimaryButton } from "../customComponents/ButtonVarients";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Phone, Check,DollarSign } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.div
      className="py-20 bg-muted/30 dark:bg-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
         <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book With Confidence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Best Price Guarantee",
                description:
                  "We offer the most competitive rates for all accommodations in Dahab",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description:
                  "Our team is always available to assist you before, during, and after your stay",
              },
              {
                icon: Check,
                title: "Verified Reviews",
                description:
                  "All reviews are from real guests who have stayed at our properties",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Newsletter */}
          <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl">
                Stay Updated
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Subscribe to our newsletter for exclusive offers and travel tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                <PrimaryButton>Subscribe</PrimaryButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

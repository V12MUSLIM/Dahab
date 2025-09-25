import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* Contact Info */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Available 24/7 for support
                </p>
                <p className="font-semibold text-lg">+20 123 456 7890</p>
                <p className="font-semibold text-lg">+20 987 654 3210</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Get a response within 24 hours
                </p>
                <p className="font-semibold text-lg break-all">
                  info@dahabadventures.com
                </p>
                <p className="font-semibold text-lg break-all">
                  bookings@dahabadventures.com
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Find us in the heart of Dahab
                </p>
                <p className="font-semibold">Mashraba Street, Dahab</p>
                <p className="font-semibold">South Sinai, Egypt</p>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter */}
          <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl">Stay Updated</CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Subscribe to our newsletter for exclusive offers and travel
                tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
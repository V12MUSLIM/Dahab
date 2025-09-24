import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Phone, Sparkles, CheckCircle2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.div
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}contactimage.png`}
          alt="Dahab sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative w-full px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-yellow-600/90 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Limited Time Offer
            </Badge>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Ready for Your Adventure?
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the magic of
              Dahab. Book now and get 20% off your first diving experience!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold px-8 py-6 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
              >
                Start Planning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-gray-900 border border-gray-300 bg-white/40 hover:bg-white/60
               dark:text-white dark:border-white/40 dark:bg-white/10 dark:hover:bg-white/20
               backdrop-blur-md font-semibold px-8 py-6 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
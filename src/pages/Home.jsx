import { Button } from "../components/ui/button";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "../components/ui/shadcn-io/marquee/index";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  ImageCard, 
  ActivityCard, 
  StatsCard, 
  TestimonialCard 
} from "../components/card";
import { Waves, Camera, Mountain, Users, Star, MapPin, Heart } from "lucide-react";

export default function Home() {
  // Enhanced animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div>
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <motion.div
          className="fixed inset-0 w-full h-screen overflow-hidden z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src="/hero.png"
            alt="Dahab"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-5 h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center text-white max-w-4xl px-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
            variants={fadeInUp}
          >
            Dahab
          </motion.h1>

          <motion.p
            className="mt-4 text-xl md:text-2xl text-gray-100 font-light tracking-wide leading-relaxed drop-shadow-lg"
            variants={fadeInUp}
          >
            Red Sea Paradise — Adventure, Relaxation, and Culture
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={scaleIn}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold px-8 py-4 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 border-0"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Now
              </Button>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Button
                size="lg"
                variant="outline"
                className="text-black border-2 border-white/60 hover:border-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Plan Trip
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced gallery section */}
      <motion.div
        className="relative w-full py-12 bg-gradient-to-b from-background to-muted z-30 min-h-screen"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Dahab's Beauty
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From pristine beaches to vibrant coral reefs, experience the magic
            of Egypt's coastal gem
          </p>
        </motion.div>

        <Marquee>
          <MarqueeContent>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="/image1.jpeg"
                  alt="Blue Lagoon in Dahab"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Blue Lagoon Paradise
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg"
                  alt="Blue Hole diving spot"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Famous Blue Hole
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg"
                  alt="Dahab coastline"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Stunning Coastline
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="https://assets.annahar.com/ContentFilesArchive/422721Image1-1180x677_d.jpg"
                  alt="Desert meets sea"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Desert Meets Sea
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="/image2.jpeg"
                  alt="Sinai mountains sunset"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Sinai Mountain Sunset
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="/image3.jpeg"
                  alt="Blue Hole diving"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    World-Class Diving
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
            <MarqueeItem>
              <motion.div className="relative group">
                <motion.img
                  src="/image4.jpeg"
                  alt="Bedouin beach camp"
                  className="h-64 w-auto rounded-xl object-cover shadow-lg"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <p className="text-white font-semibold p-4">
                    Bedouin Beach Culture
                  </p>
                </div>
              </motion.div>
            </MarqueeItem>
          </MarqueeContent>
        </Marquee>

        {/* Featured Destinations Section */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the most breathtaking locations that make Dahab a world-renowned destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ImageCard
              title="Blue Hole Diving"
              subtitle="World Famous Dive Site"
              description="Experience the world's most famous diving spot with crystal clear waters, incredible marine life, and depths that challenge even experienced divers."
              image="https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg"
              badge="Must Visit"
              rating="4.9"
              location="Dahab Coast"
              price="$85"
              buttonText="Book Dive"
            />
            
            <ImageCard
              title="Mount Sinai Trek"
              subtitle="Sacred Mountain"
              description="Climb the legendary Mount Sinai and witness one of the world's most spectacular sunrises from this historically significant peak."
              image="/image2.jpeg"
              badge="Spiritual Journey"
              rating="4.8"
              location="Sinai Peninsula"
              price="$45"
              buttonText="Join Trek"
            />
            
            <ImageCard
              title="Colored Canyon"
              subtitle="Natural Wonder"
              description="Journey through stunning rock formations with vibrant colors created by millions of years of geological processes."
              image="https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg"
              badge="Adventure"
              rating="4.7"
              location="Nuweiba Road"
              price="$55"
              buttonText="Explore Now"
            />
          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div
          className="bg-muted/30 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Adventures Await
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From underwater exploration to desert adventures, discover the activities that make Dahab special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <ActivityCard
                title="Scuba Diving"
                description="Explore the underwater paradise of the Red Sea with professional guides"
                icon={Waves}
                duration="Half Day"
                groupSize="8 people"
                difficulty="All Levels"
                price="$75"
              />
              
              <ActivityCard
                title="Desert Safari"
                description="Experience authentic Bedouin culture on a magical desert journey"
                icon={Camera}
                duration="Full Day"
                groupSize="12 people"
                difficulty="Easy"
                price="$60"
              />
              
              <ActivityCard
                title="Rock Climbing"
                description="Challenge yourself on the stunning limestone cliffs of South Sinai"
                icon={Mountain}
                duration="4 hours"
                groupSize="6 people"
                difficulty="Intermediate"
                price="$65"
              />
              
              <ActivityCard
                title="Windsurfing"
                description="Perfect winds and conditions make Dahab a windsurfing paradise"
                icon={Waves}
                duration="3 hours"
                groupSize="4 people"
                difficulty="Beginner+"
                price="$50"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose Dahab?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Numbers that speak to our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <StatsCard
                title="Happy Travelers"
                value="50K+"
                icon={Heart}
                trend="+15% this year"
                description="Satisfied visitors from around the world"
              />
              
              <StatsCard
                title="Dive Sites"
                value="25+"
                icon={Waves}
                description="World-class diving locations accessible from Dahab"
              />
              
              <StatsCard
                title="Years Experience"
                value="20+"
                icon={Star}
                description="Decades of expertise in Red Sea tourism"
              />
              
              <StatsCard
                title="Tour Guides"
                value="50+"
                icon={Users}
                description="Professional and certified local experts"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="bg-muted/30 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                What Our Guests Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real experiences from travelers who discovered the magic of Dahab
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                location="London, UK"
                rating={5}
                comment="The Blue Hole diving experience was absolutely incredible! Crystal clear waters, amazing marine life, and professional guides made this unforgettable."
                avatar="https://images.unsplash.com/photo-1494790108755-2616b612b639?w=150&h=150&fit=crop&crop=face"
              />
              
              <TestimonialCard
                name="Marco Rodriguez"
                location="Barcelona, Spain"
                rating={5}
                comment="Perfect blend of adventure and relaxation. The desert safari was magical, and the Bedouin hospitality was genuinely heartwarming."
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              />
              
              <TestimonialCard
                name="Emma Thompson"
                location="Sydney, Australia"
                rating={5}
                comment="Dahab exceeded all expectations! The Mount Sinai sunrise trek was spiritual, and the town has such a peaceful, authentic vibe."
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              />
            </div>
          </div>
        </motion.div>
         </motion.div>
      </div>
  );
}
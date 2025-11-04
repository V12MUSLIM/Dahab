import { Suspense, lazy } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { ArrowLeft, ArrowRight, Target, Camera, Waves, Star, Compass, Mountain } from "lucide-react";

// Lazy components
const Carousel = lazy(() => import("../ui/carousel").then(m => ({ default: m.Carousel })));
const CarouselContent = lazy(() => import("../ui/carousel").then(m => ({ default: m.CarouselContent })));
const CarouselItem = lazy(() => import("../ui/carousel").then(m => ({ default: m.CarouselItem })));
const CarouselNext = lazy(() => import("../ui/carousel").then(m => ({ default: m.CarouselNext })));
const CarouselPrevious = lazy(() => import("../ui/carousel").then(m => ({ default: m.CarouselPrevious })));
const ImageCard = lazy(() => import("../customComponents/cardTemplates").then(m => ({ default: m.ImageCard })));

export default function FeaturedDestinationsSection({ id }) {
  const destinations = [
    {
      title: "Blue Hole Diving",
      subtitle: "World Famous Dive Site",
      description:
        "Experience the world's most famous diving spot with crystal clear waters, incredible marine life, and depths that challenge even experienced divers.",
      image: "card2.webp",
      badge: "Must Visit",
      rating: "4.9",
      location: "Dahab Coast",
      price: "$85",
      buttonText: "Book Dive",
    },
    {
      title: "Mount Sinai Trek",
      subtitle: "Sacred Mountain",
      description:
        "Climb the legendary Mount Sinai and witness one of the world's most spectacular sunrises from this historically significant peak.",
      image: "card3.webp",
      badge: "Spiritual Journey",
      rating: "4.8",
      location: "Sinai Peninsula",
      price: "$45",
      buttonText: "Join Trek",
    },
    {
      title: "Colored Canyon",
      subtitle: "Natural Wonder",
      description:
        "Journey through stunning rock formations with vibrant colors created by millions of years of geological processes.",
      image: "card4.webp",
      badge: "Adventure",
      rating: "4.7",
      location: "Nuweiba Road",
      price: "$55",
      buttonText: "Explore Now",
    },
    {
      title: "Three Pools",
      subtitle: "Snorkeling Paradise",
      description:
        "Discover natural rock pools teeming with marine life, perfect for snorkeling and underwater photography.",
      image: "card5.webp",
      badge: "Family Friendly",
      rating: "4.6",
      location: "South Dahab",
      price: "$35",
      buttonText: "Book Tour",
    },
    {
      title: "Abu Galum",
      subtitle: "Bedouin Beach Escape",
      description:
        "Visit the serene Abu Galum Reserve, surrounded by mountains and crystal-clear waters. Enjoy camel rides, snorkeling, and traditional Bedouin hospitality.",
      image: "card1.webp",
      badge: "Eco Adventure",
      rating: "4.7",
      location: "Between Blue Hole and Nuweiba",
      price: "$40",
      buttonText: "Book Tour",
    },
  ];

  // Word animation data for first paragraph
  const firstParagraph = [
    { text: "Set", delay: 0.1 },
    { text: "your", delay: 0.15 },
    { text: "travel", delay: 0.2, highlight: true },
    { text: "goals", delay: 0.25, highlight: true, icon: Target },
    { text: "and", delay: 0.3 },
    { text: "build", delay: 0.35 },
    { text: "a", delay: 0.4 },
    { text: "best-fit", delay: 0.45, highlight: true },
    { text: "itinerary,", delay: 0.5 },
    { text: "track", delay: 0.55 },
    { text: "experiences", delay: 0.6, highlight: true },
    { text: "with", delay: 0.65 },
    { text: "photo", delay: 0.7, icon: Camera },
    { text: "memories,", delay: 0.75 },
    { text: "explore", delay: 0.8, highlight: true },
    { text: "dive", delay: 0.85, highlight: true, icon: Waves },
    { text: "sites", delay: 0.9 },
    { text: "safely.", delay: 0.95 },
  ];

  
  

  return (
    <motion.div
      id={id}
      className="w-full py-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Premium Animations */}
        <div className="text-center mb-12">
          {/* Badge with smooth entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <Badge className="mb-6 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              Top Destinations
            </Badge>
          </motion.div>

          {/* Main heading with sophisticated fade-to-bold */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-10 leading-tight px-4"
            initial={{ opacity: 0.2, fontWeight: 300 }}
            whileInView={{ opacity: 1, fontWeight: 700 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.4 }}
          >
            Dahab is a comprehensive approach to your adventure journey.
          </motion.h2>

          {/* First description with word-by-word reveal and icon animations */}
          <div className="text-base sm:text-lg md:text-xl text-foreground/85 max-w-4xl mx-auto leading-relaxed mb-4 px-4">
            {firstParagraph.map((word, index) => (
              <motion.span
                key={`first-${index}`}
                className={`inline-block mr-2 ${
                  word.highlight 
                    ? "font-bold text-amber-700 dark:text-amber-500" 
                    : ""
                }`}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.5, 
                  delay: word.delay,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {word.text}
                {word.icon && (
                  <motion.span
                    className="inline-flex items-center ml-1.5 align-middle"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: word.delay + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    <word.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
                  </motion.span>
                )}
              </motion.span>
            ))}
          </div>


        </div>

        {/* Swipe indicator */}
        <div className="flex items-center justify-center gap-3 mb-6 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
          <h4 className="text-sm font-medium">Swipe</h4>
          <ArrowRight className="w-5 h-5" />
        </div>

        {/* Carousel Section */}
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
                      <ImageCard {...destination} />
                    </Suspense>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </div>
          </Carousel>
        </Suspense>
      </div>
    </motion.div>
  );
}

import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ImageCard } from "../cardTemplates";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FeaturedDestinationsSection() {
  const destinations = [
    {
      title: "Blue Hole Diving",
      subtitle: "World Famous Dive Site",
      description: "Experience the world's most famous diving spot with crystal clear waters, incredible marine life, and depths that challenge even experienced divers.",
      image: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg",
      badge: "Must Visit",
      rating: "4.9",
      location: "Dahab Coast",
      price: "$85",
      buttonText: "Book Dive"
    },
    {
      title: "Mount Sinai Trek",
      subtitle: "Sacred Mountain",
      description: "Climb the legendary Mount Sinai and witness one of the world's most spectacular sunrises from this historically significant peak.",
      image: `${import.meta.env.BASE_URL}image2.jpeg`,
      badge: "Spiritual Journey",
      rating: "4.8",
      location: "Sinai Peninsula",
      price: "$45",
      buttonText: "Join Trek"
    },
    {
      title: "Colored Canyon",
      subtitle: "Natural Wonder",
      description: "Journey through stunning rock formations with vibrant colors created by millions of years of geological processes.",
      image: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg",
      badge: "Adventure",
      rating: "4.7",
      location: "Nuweiba Road",
      price: "$55",
      buttonText: "Explore Now"
    },
    {
      title: "Three Pools",
      subtitle: "Snorkeling Paradise",
      description: "Discover natural rock pools teeming with marine life, perfect for snorkeling and underwater photography.",
      image: `${import.meta.env.BASE_URL}image1.jpeg`,
      badge: "Family Friendly",
      rating: "4.6",
      location: "South Dahab",
      price: "$35",
      buttonText: "Book Tour"
    }
  ];

  return (
    <motion.div
      className="w-full py-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
            Top Destinations
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the most breathtaking locations that make Dahab a
            world-renowned destination
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {destinations.map((destination, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <ImageCard
                    title={destination.title}
                    subtitle={destination.subtitle}
                    description={destination.description}
                    image={destination.image}
                    badge={destination.badge}
                    rating={destination.rating}
                    location={destination.location}
                    price={destination.price}
                    buttonText={destination.buttonText}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
}
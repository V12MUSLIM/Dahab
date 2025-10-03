import { useState, useEffect, useCallback, useRef } from "react";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function GallerySection({ 
  badge, 
  header, 
  paragraph, 
  images = [], 
  autoPlay = true, 
  autoPlayInterval = 5000 
}) {
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Create autoplay plugin with useRef to prevent recreation
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoPlayInterval,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // Update current index when carousel changes
  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  // Navigate to specific slide
  const scrollTo = (index) => {
    if (!carouselApi) return;
    carouselApi.scrollTo(index);
  };

  // Initialize carousel API
  useEffect(() => {
    if (!carouselApi) return;

    onSelect();
    setScrollSnaps(carouselApi.scrollSnapList());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  if (!images || images.length === 0) {
    return (
      <section className="w-full py-20 px-4 bg-muted/30 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          {badge && (
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              {badge}
            </Badge>
          )}
          {header && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {header}
            </h2>
          )}
          <p className="text-muted-foreground">No images available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-4 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          {badge && (
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              {badge}
            </Badge>
          )}
          {header && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {header}
            </h2>
          )}
          {paragraph && (
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {paragraph}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={autoPlay ? [autoplayPlugin.current] : []}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden border-2 border-gray-300 hover:border-yellow-600 dark:border-gray-800 dark:hover:border-yellow-600 transition-all duration-300 shadow-lg dark:shadow-2xl">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-black/95 dark:via-black/60 dark:to-transparent transition-colors duration-300" />
                      
                      {/* Image Overlay with Title and Description */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            {image.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                            {image.description}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden sm:flex -left-12 lg:-left-16 bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-500 hover:border-yellow-400 text-white shadow-xl hover:shadow-2xl hover:shadow-yellow-600/50 transition-all duration-300 w-12 h-12 lg:w-14 lg:h-14 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:border-yellow-500 dark:hover:border-yellow-400 dark:shadow-yellow-600/50" />
            <CarouselNext className="hidden sm:flex -right-12 lg:-right-16 bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-500 hover:border-yellow-400 text-white shadow-xl hover:shadow-2xl hover:shadow-yellow-600/50 transition-all duration-300 w-12 h-12 lg:w-14 lg:h-14 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:border-yellow-500 dark:hover:border-yellow-400 dark:shadow-yellow-600/50" />
          </Carousel>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap px-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-10 sm:w-12 h-2.5 sm:h-3 bg-yellow-600 shadow-lg shadow-yellow-600/60 dark:bg-yellow-600 dark:shadow-yellow-600/60"
                    : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-yellow-600/50 hover:scale-125 dark:bg-gray-700 dark:hover:bg-yellow-600/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4 sm:mt-5">
            <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-background border border-border text-sm sm:text-base font-bold shadow-md">
              <span className="text-yellow-600 text-lg dark:text-yellow-500">{currentIndex + 1}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{images.length}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
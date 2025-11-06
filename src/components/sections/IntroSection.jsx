import { useRef } from "react";
import { Badge } from "../ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function IntroSection({
  title,
  smText = "",
  subtitle,
  images = [],
  autoPlay = true,
  autoPlayInterval = 2000,
}) {
  // Autoplay plugin
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoPlayInterval,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  if (!images || images.length === 0) {
    return (
      <section className="w-full bg-muted/30 dark:bg-muted/20 py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {title && (
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {title}
              </h1>
            )}
            <p className="text-gray-600 dark:text-gray-300">
              No images available
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-muted/30 dark:bg-muted/20 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-10 xl:gap-12">
          {/* Left Text */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {smText && (
              <div className="inline-block">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-yellow-500 dark:text-yellow-400 uppercase tracking-widest animate-pulse">
                  {smText}
                </p>
                <div className="h-0.5 bg-gradient-to-r from-yellow-500 to-transparent mt-1"></div>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              <span className="block mb-1 sm:mb-2 transform transition-all duration-300">
                <span className="text-yellow-500 drop-shadow-lg">D</span>
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  iscover
                </span>
              </span>
              <span className="block mb-1 sm:mb-2 transform transition-all duration-300">
                <span className="text-yellow-500 drop-shadow-lg">D</span>
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  ahab
                </span>
              </span>
              <span className="block transform transition-all duration-300">
                <span className="text-yellow-500 drop-shadow-lg">W</span>
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  ith us
                </span>
              </span>
            </h1>

            {subtitle && (
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-sm sm:max-w-md font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Carousel */}
          <div className="relative w-full">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={autoPlay ? [autoplayPlugin.current] : []}
              className="w-full"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                      <img
                        src={image.src || image}
                        alt={image.alt || `Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

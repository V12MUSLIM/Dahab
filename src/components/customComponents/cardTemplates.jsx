import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "./ButtonVarients";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Check,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Waves,
  Mountain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Enhanced Card wrapper with animations
const DahabCard = React.forwardRef(
  ({ className, children, hover = true, ...props }, ref) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              y: -8,
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={cn("group", className)}
    >
      <Card
        ref={ref}
        className={cn(
          "overflow-hidden border-border bg-card transition-all duration-300",
          hover &&
            "hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-800/50",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
);
DahabCard.displayName = "DahabCard";

// Card with Image
const ImageCard = ({
  title,
  subtitle,
  description,
  image,
  badge,
  rating,
  location,
  price,
  buttonText = "Learn More",
  onButtonClick,
  className,
  href,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{
      y: -8,
      transition: { duration: 0.2 },
    }}
    className={cn("group", className)}
  >
    <Link to={href}>
      <Card
        className={cn(
          "overflow-hidden border-border bg-card transition-all duration-300 p-0",
          "hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-800/50"
        )}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-80 object-cover transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {badge && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white border-0">
                {badge}
              </Badge>
            </div>
          )}

          {rating && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
          )}
        </div>

        <CardHeader className="pb-3 px-6 pt-4">
          {subtitle && (
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-1">
              {subtitle}
            </p>
          )}
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            {title}
          </CardTitle>
          {location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
          )}
        </CardHeader>

        <CardContent className="pb-4 px-6">
          <CardDescription className="text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0 px-6 pb-6">
          <div className="flex items-center gap-2">
            {price && (
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {price}
              </span>
            )}
          </div>

          <PrimaryButton className="w-40" onClick={onButtonClick}>
            {buttonText}
          </PrimaryButton>
        </CardFooter>
      </Card>
    </Link>
  </motion.div>
);

const DestinationCard = ({
  title = "Blue Hole",
  subtitle = "Dahab, Egypt",
  description = "One of the world's most famous dive sites, featuring crystal-clear waters and vibrant marine life.",
  images = [], // REMOVED DEFAULT IMAGES - pass them from parent component
  badge = "Popular",
  rating = "4.9",
  location = "South Sinai",
  price = "$85",
  buttonText = "Book Now",
  onButtonClick = () => {},
  className,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // If no images provided, show placeholder
  const displayImages = images.length > 0 ? images : ["/Dahab/placeholder.jpg"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const openGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className={cn("group cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "overflow-hidden border-border bg-card transition-all duration-300 p-0",
            "hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-800/50"
          )}
        >
          {/* IMAGE SECTION */}
          <div
            className="relative overflow-hidden h-80 cursor-pointer"
            onClick={openGallery}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {badge && (
              <motion.div
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0 shadow-lg">
                  {badge}
                </Badge>
              </motion.div>
            )}

            {rating && (
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-yellow-400/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-white">
                  {rating}
                </span>
              </motion.div>
            )}

            {/* Navigation Arrows - Only show if multiple images */}
            <AnimatePresence>
              {isHovered && displayImages.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Thumbnail Gallery - Only show if multiple images */}
            <AnimatePresence>
              {isHovered && displayImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                >
                  {displayImages.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-yellow-400 scale-110 shadow-lg"
                          : "border-white/50 opacity-70 hover:opacity-100"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image Counter - Only show if multiple images */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white text-xs px-2 py-1 rounded-full font-medium">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            )}
          </div>

          {/* CONTENT SECTION */}
          <Link to={href}>
            <CardHeader className="pb-3 px-6 pt-5">
              {subtitle && (
                <motion.p
                  className="text-sm font-semibold text-yellow-500 dark:text-yellow-400 mb-1 uppercase tracking-wide"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {subtitle}
                </motion.p>
              )}

              <CardTitle
                className={cn(
                  "text-xl font-bold transition-colors duration-300",
                  isHovered
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-gray-900 dark:text-white"
                )}
              >
                {title}
              </CardTitle>
              {location && (
                <motion.div
                  className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 mt-2"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <MapPin className="h-4 w-4" />
                  {location}
                </motion.div>
              )}
            </CardHeader>

            <CardContent className="pb-4 px-6">
              <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </CardDescription>
            </CardContent>
          </Link>

          <CardFooter className="flex items-center justify-between pt-0 px-6 pb-6">
            <div className="flex items-center gap-2">
              {price && (
                <motion.span
                  className="text-2xl font-bold text-yellow-500 dark:text-yellow-400"
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {price}
                </motion.span>
              )}
            </div>
            <Link to={href}>
              <PrimaryButton className="w-40" onClick={onButtonClick}>
                {buttonText}
              </PrimaryButton>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-50"
            >
              <X className="h-8 w-8" />
            </button>

            {displayImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {displayImages.length > 1 && (
              <>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {displayImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-yellow-400 scale-110 shadow-lg"
                          : "border-white/50 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {displayImages.length}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
const StayCard = ({
  name = "Swiss Inn Resort Dahab",
  type = "Luxury Resort",
  location = "Lighthouse Beach",
  description = "Luxury beachfront resort with direct beach access, multiple dining options, and family-friendly facilities.",
  images = [],
  popular = false,
  rating = "4.8",
  reviews = 342,
  pricePerNight = 138,
  amenities = [],
  features = [],
  buttonText = "Book Now",
  onButtonClick = () => {},
  className,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // If no images provided, show placeholder
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const openGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Amenity icon mapping
  const amenityIcons = {
    Wifi: Wifi,
    Coffee: Coffee,
    Utensils: Utensils,
    Car: Car,
    Waves: Waves,
    Mountain: Mountain,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className={cn("group cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "overflow-hidden border-border bg-card transition-all duration-300 p-0 h-full flex flex-col",
            "hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-800/50",
            popular &&
              "border-yellow-600 dark:border-yellow-700 shadow-yellow-600/20 dark:shadow-yellow-700/20"
          )}
        >
          {/* IMAGE SECTION */}
          <div
            className="relative overflow-hidden h-64 cursor-pointer"
            onClick={openGallery}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Popular Badge */}
            {popular && (
              <motion.div
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0 shadow-lg">
                  Most Popular
                </Badge>
              </motion.div>
            )}

            {/* Type Badge */}
            <motion.div
              className="absolute bottom-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0">
                {type}
              </Badge>
            </motion.div>

            {/* Favorite Button */}
            <motion.button
              className="absolute top-4 right-4 p-2 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-full shadow-lg hover:bg-white/30 dark:hover:bg-gray-900/30 transition-all z-10"
              onClick={toggleFavorite}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                )}
              />
            </motion.button>

            {/* Navigation Arrows - Only show if multiple images */}
            <AnimatePresence>
              {isHovered && displayImages.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Thumbnail Gallery - Only show if multiple images */}
            <AnimatePresence>
              {isHovered && displayImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                >
                  {displayImages.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-10 h-10 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-yellow-400 scale-110 shadow-lg"
                          : "border-white/50 opacity-70 hover:opacity-100"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image Counter - Only show if multiple images */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white text-xs px-2 py-1 rounded-full font-medium">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            )}
          </div>

          {/* CONTENT SECTION */}
          <div className="flex-1 flex flex-col">
            <CardHeader className="pb-3 px-6 pt-5">
              <div className="flex items-start justify-between mb-2">
                <CardTitle
                  className={cn(
                    "text-xl font-bold transition-colors duration-300",
                    isHovered
                      ? "text-yellow-500 dark:text-yellow-400"
                      : "text-gray-900 dark:text-white"
                  )}
                >
                  {name}
                </CardTitle>
              </div>

              <motion.div
                className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                {location}
              </motion.div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500" />
                  <span className="font-semibold">{rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </div>
            </CardHeader>

            <CardContent className="pb-4 px-6 flex-1">
              <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {description}
              </CardDescription>

              {/* Amenities */}

              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {amenities.map((amenity, idx) => {
                    const IconComponent = amenityIcons[amenity];
                    return (
                      <div
                        key={idx}
                        className="p-2 bg-muted rounded-lg flex items-center justify-center"
                        title={amenity}
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="space-y-2">
                  {features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 px-6 pb-6 border-t">
              <div>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-2xl font-bold text-yellow-500 dark:text-yellow-400"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${pricePerNight}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">/night</span>
                </div>
              </div>
              <Link to={href || "#"}>
                <PrimaryButton className="w-32" onClick={onButtonClick}>
                  {buttonText}
                </PrimaryButton>
              </Link>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-50"
            >
              <X className="h-8 w-8" />
            </button>

            {displayImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${name} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {displayImages.length > 1 && (
              <>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {displayImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-yellow-400 scale-110 shadow-lg"
                          : "border-white/50 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {displayImages.length}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
// ExperienceCard - Glassmorphism Style
const ExperienceCard = ({
  title = "Desert Safari Adventure",
  subtitle = "Adventure Experience",
  description = "Explore the stunning desert landscapes of Dahab with professional guides.",
  images = [],
  badge = "Popular",
  rating = "4.9",
  location = "Dahab Desert",
  duration = "4 hours",
  groupSize = "4-8 people",
  difficulty = "Moderate",
  price = "$95",
  buttonText = "Book Now",
  onButtonClick = () => {},
  className,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const displayImages = images.length > 0 ? images : ["/Dahab/placeholder.jpg"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const openGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className={cn("group cursor-pointer", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "overflow-hidden border-border bg-card transition-all duration-300 p-0",
            "hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-200 dark:hover:border-yellow-800/50"
          )}
        >
          {/* IMAGE SECTION */}
          <div
            className="relative overflow-hidden h-72 cursor-pointer"
            onClick={openGallery}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {badge && (
              <motion.div
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-0 shadow-lg">
                  {badge}
                </Badge>
              </motion.div>
            )}

            {rating && (
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-yellow-400/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-white">
                  {rating}
                </span>
              </motion.div>
            )}

            {/* Glassmorphism Info Bar - Shows on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20"
                >
                  <div className="grid grid-cols-3 gap-3 text-white">
                    <div className="text-center">
                      <Clock className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">{duration}</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">{groupSize}</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="h-4 w-4 mx-auto mb-1" />
                      <p className="text-xs font-medium">{difficulty}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <AnimatePresence>
              {isHovered && displayImages.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Image Counter */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            )}
          </div>

          {/* CONTENT SECTION */}
          <Link to={href}>
            <CardHeader className="pb-3 px-6 pt-5">
              {subtitle && (
                <motion.p
                  className="text-sm font-semibold text-yellow-500 dark:text-yellow-400 mb-1 uppercase tracking-wide"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {subtitle}
                </motion.p>
              )}

              <CardTitle
                className={cn(
                  "text-xl font-bold transition-colors duration-300",
                  isHovered
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-gray-900 dark:text-white"
                )}
              >
                {title}
              </CardTitle>

              {location && (
                <motion.div
                  className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 mt-2"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <MapPin className="h-4 w-4" />
                  {location}
                </motion.div>
              )}
            </CardHeader>

            <CardContent className="pb-4 px-6">
              <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {description}
              </CardDescription>

              {/* Info Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-yellow-500 dark:text-yellow-400 text-xs font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {duration}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-yellow-500 dark:text-yellow-400 text-xs font-medium">
                  <Users className="h-3.5 w-3.5" />
                  {groupSize}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-yellow-500 dark:text-yellow-400 text-xs font-medium">
                  {difficulty}
                </div>
              </div>
            </CardContent>
          </Link>

          <CardFooter className="flex items-center justify-between pt-0 px-6 pb-6 border-t border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">From</p>
              <motion.span
                className="text-2xl font-bold text-yellow-500 dark:text-yellow-400"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {price}
              </motion.span>
            </div>
            <Link to={href}>
              <PrimaryButton className="w-40" onClick={onButtonClick}>
                {buttonText}
              </PrimaryButton>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-50"
            >
              <X className="h-8 w-8" />
            </button>

            {displayImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 transition-all z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={displayImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {displayImages.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Activity Card
const ActivityCard = ({
  title,
  description,
  icon: Icon, // Now expects a component, not a string
  duration,
  groupSize,
  difficulty,
  price,
  onBookClick,
  className,
}) => {
  return (
    <DahabCard
      className={`transition-shadow duration-200 hover:shadow-lg ${className}`}
    >
      <CardHeader className="text-center pb-3">
        <div className="mx-auto mb-3 p-3 rounded-full bg-yellow-50 dark:bg-yellow-900/20 w-fit">
          {Icon && (
            <Icon className="h-7 w-7 text-yellow-600 dark:text-yellow-500" />
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-center text-sm text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {duration && (
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-yellow-900/10">
              <Clock className="h-4 w-4 text-gray-500 dark:text-yellow-600 mb-1" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {duration}
              </span>
            </div>
          )}
          {groupSize && (
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-yellow-900/10">
              <Users className="h-4 w-4 text-gray-500 dark:text-yellow-600 mb-1" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {groupSize}
              </span>
            </div>
          )}
          {difficulty && (
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-yellow-900/10">
              <span className="text-gray-500 dark:text-yellow-600 mb-1 text-xs">
                Level
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {difficulty}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {price && (
          <div className="text-center">
            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
              ${price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              per person
            </span>
          </div>
        )}
        <PrimaryButton onClick={onBookClick}>Book now</PrimaryButton>
      </CardFooter>
    </DahabCard>
  );
};



export {
  DahabCard,
  StayCard,
  ImageCard,
  ActivityCard,

  DestinationCard,
  ExperienceCard,
};

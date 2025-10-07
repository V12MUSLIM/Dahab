import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { motion,AnimatePresence } from "framer-motion";
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
import { Star, MapPin, Calendar, Users,ChevronLeft, ChevronRight, X} from "lucide-react";
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
  images = [
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
  ],
  badge = "Popular",
  rating = "4.9",
  location = "South Sinai",
  price = "$85",
  buttonText = "Book Now",
  onButtonClick = () => {},
  className,
  href = "#",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openGallery = (e) => {
    e.preventDefault();
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
        <a href={href} className="block">
          <Card
            className={cn(
              "overflow-hidden border-2 backdrop-blur-xl transition-all duration-300 p-0",
              "bg-white/90 dark:bg-gray-900/90",
              "hover:shadow-2xl hover:shadow-yellow-500/20 hover:border-yellow-400 dark:hover:border-yellow-500",
              "border-yellow-500/50 dark:border-yellow-600/50"
            )}
          >
            <div className="relative overflow-hidden h-80">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={openGallery}
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

              {/* Navigation Arrows */}
              <AnimatePresence>
                {isHovered && images.length > 1 && (
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

              {/* Thumbnail Gallery on Hover */}
              <AnimatePresence>
                {isHovered && images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                  >
                    {images.map((img, index) => (
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
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white text-xs px-2 py-1 rounded-full font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

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

              <PrimaryButton className="w-40" onClick={onButtonClick}>
                {buttonText}
              </PrimaryButton>
            </CardFooter>
          </Card>
        </a>
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

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, index) => (
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
                  />
                </button>
              ))}
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
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
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  duration,
  groupSize,
  difficulty,
  price,
  onBookClick,
  className,
}) => (
  <DahabCard className={className}>
    <CardHeader className="text-center pb-4">
      <div className="mx-auto mb-4 p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 w-fit">
        <Icon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      <CardTitle className="text-xl font-bold text-foreground">
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      <CardDescription className="text-center text-muted-foreground">
        {description}
      </CardDescription>

      <div className="grid grid-cols-3 gap-2 text-xs">
        {duration && (
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Calendar className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="font-medium">{duration}</span>
          </div>
        )}
        {groupSize && (
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="font-medium">{groupSize}</span>
          </div>
        )}
        {difficulty && (
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <span className="text-muted-foreground mb-1">Level</span>
            <span className="font-medium">{difficulty}</span>
          </div>
        )}
      </div>
    </CardContent>

    <CardFooter className="flex flex-col gap-3">
      {price && (
        <div className="text-center">
          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {price}
          </span>
          <span className="text-sm text-muted-foreground ml-1">per person</span>
        </div>
      )}
      <PrimaryButton onClick={onBookClick}>Book now</PrimaryButton>
    </CardFooter>
  </DahabCard>
);

// Stats Card
const StatsCard = ({
  title,
  value,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  trend,
  description,
  className,
}) => (
  <DahabCard hover={false} className={className}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
          <Icon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-3">{description}</p>
      )}
    </CardContent>
  </DahabCard>
);

// Testimonial Card
const TestimonialCard = ({
  name,
  location,
  rating,
  comment,
  avatar,
  className,
}) => (
  <DahabCard className={className}>
    <CardContent className="p-6">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
      </div>

      <CardDescription className="text-base text-foreground mb-4 italic">
        "{comment}"
      </CardDescription>

      <div className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </CardContent>
  </DahabCard>
);

export { DahabCard, ImageCard, ActivityCard, StatsCard, TestimonialCard , DestinationCard};

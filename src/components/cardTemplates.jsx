import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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
         <Link to={href}>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700 text-white border-0"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </Link>
      
      </CardFooter>
    </Card>
  </motion.div>
);
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
      <Button
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white border-0"
        onClick={onBookClick}
      >
        Book Now
      </Button>
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

// Usage Examples
const CardExamples = () => {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Dahab Card Components
        </h1>

        {/* Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ImageCard
            title="Blue Hole Diving"
            subtitle="Popular Attraction"
            description="Experience the world's most famous diving spot with crystal clear waters and incredible marine life."
            image="https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg"
            badge="Best Seller"
            rating="4.9"
            location="Dahab, Egypt"
            price="$85"
            buttonText="Book Dive"
          />

          <ImageCard
            title="Bedouin Desert Safari"
            subtitle="Cultural Experience"
            description="Journey through the Sinai desert on camelback and experience authentic Bedouin hospitality."
            image="https://assets.annahar.com/ContentFilesArchive/422721Image1-1180x677_d.jpg"
            badge="Authentic"
            rating="4.7"
            location="Sinai Desert"
            price="$60"
            buttonText="Join Safari"
          />

          <ImageCard
            title="Mount Sinai Sunrise"
            subtitle="Spiritual Journey"
            description="Climb the sacred Mount Sinai and witness one of the world's most breathtaking sunrises."
            image="https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg"
            badge="Must Do"
            rating="4.8"
            location="Mount Sinai"
            price="$45"
            buttonText="Book Trek"
          />
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ActivityCard
            title="Scuba Diving"
            description="Explore the underwater paradise of the Red Sea"
            icon={Star}
            duration="3 hours"
            groupSize="6 people"
            difficulty="Beginner"
            price="$75"
          />

          <ActivityCard
            title="Windsurfing"
            description="Perfect conditions for windsurfing enthusiasts"
            icon={MapPin}
            duration="2 hours"
            groupSize="4 people"
            difficulty="Intermediate"
            price="$55"
          />

          <StatsCard
            title="Happy Visitors"
            value="50K+"
            icon={Users}
            trend="+12% this year"
            description="Travelers who experienced Dahab magic"
          />

          <StatsCard
            title="Dive Sites"
            value="25+"
            icon={Star}
            description="World-class diving locations"
          />
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestimonialCard
            name="Sarah Johnson"
            location="London, UK"
            rating={5}
            comment="The Blue Hole was absolutely incredible! The diving experience exceeded all expectations and the guides were fantastic."
            avatar="https://images.unsplash.com/photo-1494790108755-2616b612b-2616b612b639?w=150"
          />

          <TestimonialCard
            name="Ahmed Hassan"
            location="Cairo, Egypt"
            rating={5}
            comment="Perfect blend of adventure and relaxation. The desert safari was unforgettable and the Bedouin culture experience was authentic."
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
          />
        </div>
      </div>
    </div>
  );
};

export {
  DahabCard,
  ImageCard,
  ActivityCard,
  StatsCard,
  TestimonialCard,
  CardExamples,
};

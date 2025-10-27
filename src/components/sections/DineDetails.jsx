"use client";
import { useState, lazy, Suspense, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Heart,
  ArrowLeft,
  Utensils,
  Globe,
  DollarSign,
  Users,
  Calendar,
  ChefHat,
  Wifi,
  CreditCard,
  Car,
  Check,
  Award,
  Shield,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDine } from "@/hooks/useDine";

const PrimaryButton = lazy(() =>
  import("@/components/customComponents/ButtonVarients").then((module) => ({
    default: module.PrimaryButton,
  }))
);

const SecondaryButton = lazy(() =>
  import("@/components/customComponents/ButtonVarients").then((module) => ({
    default: module.SecondaryButton,
  }))
);

const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const SocialMediaSection = lazy(() => import("@/components/sections/SocialMediaSection"));

const SectionSkeleton = memo(() => (
  <div className="w-full h-32 flex items-center justify-center" role="status" aria-label="Loading">
    <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mx-auto" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  </div>
));

const ButtonSkeleton = memo(() => (
  <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" role="status" aria-label="Loading button" />
));

const BookingForm = memo(({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reservation submitted successfully!");
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white py-6 text-lg font-semibold shadow-lg transition-all hover:scale-105">
          <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Table</DialogTitle>
          <DialogDescription>
            Reserve your table at {restaurant.title}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+20 123 456 7890"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests *</Label>
            <Select
              name="guests"
              value={formData.guests}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, guests: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
                <SelectItem value="8+">More than 8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              placeholder="Any dietary restrictions?"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm"
              aria-label="Special requests"
            />
          </div>

          <div className="bg-muted p-3 rounded-md text-xs text-muted-foreground">
            <p className="font-medium mb-1">Cancellation Policy:</p>
            <p>Free cancellation up to 24 hours before.</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white"
          >
            Confirm Reservation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

const NotFoundState = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black">
    <h1 className="text-3xl font-bold dark:text-white mb-4">
      Restaurant not found
    </h1>
    <p className="text-muted-foreground mb-6">
      The restaurant you're looking for doesn't exist.
    </p>
    <Link to="/dine">
      <Suspense fallback={<ButtonSkeleton />}>
        <PrimaryButton icon={ArrowLeft}>Back to All Restaurants</PrimaryButton>
      </Suspense>
    </Link>
  </div>
));

const AMENITIES = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: CreditCard, label: "Card Payment" },
  { icon: Car, label: "Parking" },
  { icon: ChefHat, label: "Chef Specials" },
];

const WHY_BOOK_ITEMS = [
  "Best price guarantee",
  "24/7 customer support",
  "Free cancellation",
  "Professional service",
  "Quality guarantee",
];

export default function DineDetails() {
  const { IdPage } = useParams();
  const [favorites, setFavorites] = useState([]);
  
  const { allDining, isLoading } = useDine();
  
  const restaurant = allDining?.find(
    (r) => String(r.IdPage).toLowerCase() === String(IdPage).toLowerCase()
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!restaurant) return <NotFoundState />;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection
          image={restaurant.image}
          title={restaurant.title}
          subtitle={restaurant.subtitle}
          Icon={Utensils}
          badge={restaurant.badge}
          PrimaryButton={PrimaryButton}
          stats={[
            { icon: Clock, text: "Open Daily" },
            { icon: Users, text: "4-8 Guests" },
            { icon: Star, text: `${restaurant.rating}/5 Rating` },
          ]}
        />
      </Suspense>

      {restaurant.gallery?.length > 0 && (
        <Suspense fallback={<SectionSkeleton />}>
          <GallerySection
            images={restaurant.gallery}
            autoPlay
            autoPlayInterval={2000}
          />
        </Suspense>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
            {restaurant.badge && (
              <motion.span
                className="inline-block bg-yellow-600 dark:bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {restaurant.badge}
              </motion.span>
            )}

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {restaurant.description}
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {[
                { icon: Star, title: "Rating", value: `${restaurant.rating}/5.0` },
                { icon: DollarSign, title: "Price Range", value: restaurant.price },
                { icon: Utensils, title: "Cuisine", value: restaurant.category },
                { icon: Users, title: "Group Size", value: "4-8 people" },
              ].map((item, index) => (
                <Card key={index} className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-yellow-600/20">
                  <CardHeader>
                    <item.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" aria-hidden="true" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {restaurant.features && restaurant.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" aria-hidden="true" />
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {AMENITIES.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 transition-all hover:scale-105"
                        >
                          <amenity.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                          <span className="font-medium">{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                    <ul className="space-y-3">
                      {restaurant.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {restaurant.menu?.length > 0 && (
              <motion.div
                id="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Menu Highlights</h2>
                <div className="space-y-4">
                  {restaurant.menu.map((item, index) => (
                    <Card
                      key={index}
                      className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-yellow-600/10"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </div>
                          <span className="font-bold text-yellow-600 dark:text-yellow-500 text-xl">
                            {item.price}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              id="booking"
              className="sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader className="text-center">
                  <CardDescription className="text-sm">Price Range</CardDescription>
                  <CardTitle className="text-4xl md:text-5xl font-black text-yellow-600 dark:text-yellow-500">
                    {restaurant.price}
                  </CardTitle>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="w-5 h-5 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500" aria-hidden="true" />
                    <span className="font-bold text-lg">{restaurant.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">(150+ reviews)</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <p className="text-muted-foreground text-sm mb-2">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                        <span className="font-semibold text-sm">{restaurant.location}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <p className="text-muted-foreground text-sm mb-2">Cuisine Type</p>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                        <span className="font-semibold">{restaurant.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 flex flex-col">
                    <BookingForm restaurant={restaurant} />

                    <Suspense fallback={<ButtonSkeleton />}>
                      <SecondaryButton
                        onClick={() => toggleFavorite(restaurant._id || restaurant.id)}
                        className="w-full"
                        aria-label={isFavorite(restaurant._id || restaurant.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          className={`w-5 h-5 mr-2 ${isFavorite(restaurant._id || restaurant.id) ? "fill-current text-red-500" : ""}`}
                          aria-hidden="true"
                        />
                        {isFavorite(restaurant._id || restaurant.id) ? "Remove from Favorites" : "Add to Favorites"}
                      </SecondaryButton>
                    </Suspense>
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
                    {restaurant.email && (
                      <a
                        href={`mailto:${restaurant.email}`}
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-yellow-500/50 shadow-sm bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                        aria-label={`Email ${restaurant.title}`}
                      >
                        <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors truncate">
                          {restaurant.email}
                        </span>
                      </a>
                    )}

                    {restaurant.phone && (
                      <a
                        href={`tel:${restaurant.phone}`}
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-yellow-500/50 shadow-sm bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                        aria-label={`Call ${restaurant.title}`}
                      >
                        <Phone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                          {restaurant.phone}
                        </span>
                      </a>
                    )}

                    {restaurant.website && (
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-yellow-500/50 shadow-sm bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                        aria-label={`Visit ${restaurant.title} website`}
                      >
                        <Globe className="h-6 w-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors truncate">
                          Visit Website
                        </span>
                      </a>
                    )}
                  </div>

                  {restaurant.openingHours && (
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                        Opening Hours
                      </h3>
                      <div className="space-y-2 text-sm">
                        {Object.entries(restaurant.openingHours)
                          .slice(0, 3)
                          .map(([day, hours]) => (
                            <div key={day} className="flex justify-between text-muted-foreground">
                              <span className="capitalize font-medium">{day}</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                      <span>100% Secure Booking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Why Book With Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {WHY_BOOK_ITEMS.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Link to="/dine">
            <Suspense fallback={<ButtonSkeleton />}>
              <PrimaryButton icon={ArrowLeft}>Back to All Restaurants</PrimaryButton>
            </Suspense>
          </Link>
        </motion.div>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
        />
      </Suspense>
    </div>
  );
}

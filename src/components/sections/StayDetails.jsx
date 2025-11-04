// sections/StayDetailsSection.jsx
"use client";
import { lazy, Suspense, useState, memo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  MapPin, Clock, Users, Star, Calendar, Check, ChevronLeft,
  Shield, Award, Phone, Mail, Share2, Heart, 
  Bed, Home, Wifi, Coffee, Wind, Info, ExternalLink, Hotel
} from "lucide-react";
import { useStay } from "@/Context/StayContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Lazy load components
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

const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const SocialMediaSection = lazy(() => import("@/components/sections/SocialMediaSection"));

// Constants
const WHY_BOOK_ITEMS = [
  "Best price guarantee",
  "Free cancellation",
  "Instant confirmation",
  "Secure payment",
  "24/7 support",
];

// Skeleton Components
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

const NotFoundState = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black">
    <h1 className="text-3xl font-bold dark:text-white mb-4">
      Stay not found
    </h1>
    <p className="text-muted-foreground mb-6">
      The accommodation you're looking for doesn't exist.
    </p>
    <Link to="/stay">
      <Suspense fallback={<ButtonSkeleton />}>
        <PrimaryButton icon={ChevronLeft}>
          Back to All Stays
        </PrimaryButton>
      </Suspense>
    </Link>
  </div>
));

export default function StayDetailsSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStayById } = useStay();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const stay = getStayById(id);

  if (!stay) return <NotFoundState />;

  const googleMapsLink = stay.locationDetails
    ? `https://www.google.com/maps/search/?api=1&query=${stay.locationDetails.coordinates.lat},${stay.locationDetails.coordinates.lng}`
    : "";

  const amenityIcons = {
    "Free WiFi": Wifi,
    "Air Conditioning": Wind,
    "Restaurant": Coffee,
    "Bar": Coffee,
    "Fitness Center": Award,
    "Private Beach": Home,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection
          image={stay?.images?.[0]}
          title={stay.name}
          subtitle={stay.subtitle}
          Icon={Hotel}
          badge={stay.badge}
          PrimaryButton={PrimaryButton}
          stats={[
            { icon: Star, text: `${stay.rating}/5 Rating` },
            { icon: MapPin, text: stay.location },
            { icon: Bed, text: `${stay.totalRooms} Rooms` },
          ]}
        />
      </Suspense>

      {/* Gallery Section */}
      {stay.galleryImages?.length > 0 && (
        <Suspense fallback={<SectionSkeleton />}>
          <GallerySection
            images={stay.galleryImages}
            autoPlay
            autoPlayInterval={2000}
          />
        </Suspense>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badge */}
            {stay.badge && (
              <motion.span
                className="inline-block bg-amber-600 dark:bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {stay.badge}
              </motion.span>
            )}

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {stay.fullDescription || stay.description}
            </motion.p>

            {/* Info Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {[
                { icon: Star, title: "Rating", value: `${stay.rating}/5.0` },
                { icon: Bed, title: "Rooms", value: `${stay.totalRooms} Available` },
                { icon: Users, title: "Capacity", value: `Up to ${stay.maxGuests}` },
                { icon: Award, title: "Category", value: `${stay.starRating} Star` },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
                  <CardHeader>
                    <item.icon className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Room Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                  <Bed className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                  <CardTitle>Available Room Types</CardTitle>
                  <CardDescription>Choose your perfect accommodation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stay.roomTypes.map((room, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedRoom === index
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-amber-300"
                      }`}
                      onClick={() => setSelectedRoom(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{room.name}</h4>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Home className="w-4 h-4" />
                              {room.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              {room.beds}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Max {room.maxOccupancy}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                            ${room.price}
                          </div>
                          <div className="text-xs text-muted-foreground">per night</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Location */}
            {stay.locationDetails && (
              <motion.div
                id="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                    <CardTitle>Location & Nearby Attractions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full h-64 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-6">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d${stay.locationDetails.coordinates.lng}!3d${stay.locationDetails.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${stay.locationDetails.coordinates.lat}!5e0!3m2!1sen!2seg!4v1234567890`}
                        allowFullScreen
                        loading="lazy"
                        title={`Map showing ${stay.name}`}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>Address:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          {stay.locationDetails.address}
                        </p>
                        <p className="text-muted-foreground">
                          {stay.locationDetails.city}, {stay.locationDetails.region}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>Nearby Attractions:</strong>
                        </p>
                        <div className="space-y-2">
                          {stay.locationDetails.nearbyAttractions.map((attraction, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-muted-foreground">{attraction.name}</span>
                              <span className="text-amber-600 dark:text-amber-500 font-medium">
                                {attraction.distance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 hover:underline font-semibold mt-4"
                        aria-label="Open location in Google Maps"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Open in Google Maps
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                  <Award className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                  <CardTitle>Property Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(stay.amenities).map(([category, items]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="font-semibold mb-3 capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {items.map((item, index) => {
                          const IconComponent = amenityIcons[item] || Check;
                          return (
                            <div key={index} className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" aria-hidden="true" />
                              <span className="text-muted-foreground">{item}</span>
                            </div>
                          );
                        })}
                      </div>
                      {category !== Object.keys(stay.amenities)[Object.keys(stay.amenities).length - 1] && (
                        <div className="border-t mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* What's Included */}
            {stay.priceIncludes && stay.priceIncludes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-amber-600/10 to-amber-700/10 dark:from-amber-600/20 dark:to-amber-700/20 border-amber-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Check className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                    <CardTitle>What's Included in Your Stay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {stay.priceIncludes.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full" aria-hidden="true" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader>
                  <Info className="w-8 h-8 text-amber-600 dark:text-amber-500 mb-4" aria-hidden="true" />
                  <CardTitle>Property Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Check-in / Check-out</p>
                      <p className="text-muted-foreground text-sm">
                        From {stay.checkInTime} / Until {stay.checkOutTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Cancellation</p>
                      <p className="text-muted-foreground text-sm">{stay.policies.cancellation}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Children & Pets</p>
                      <p className="text-muted-foreground text-sm">{stay.policies.children}</p>
                      <p className="text-muted-foreground text-sm">{stay.policies.pets}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              id="booking"
              className="sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-amber-600/10 to-amber-700/10 dark:from-amber-600/20 dark:to-amber-700/20 border-amber-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader className="text-center">
                  <CardDescription className="text-sm">Starting from</CardDescription>
                  <CardTitle className="text-4xl md:text-5xl font-black text-amber-600 dark:text-amber-500">
                    ${stay.roomTypes[selectedRoom].price}
                    <span className="text-xl font-normal text-muted-foreground">/night</span>
                  </CardTitle>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="w-5 h-5 fill-amber-600 text-amber-600 dark:fill-amber-500 dark:text-amber-500" aria-hidden="true" />
                    <span className="font-bold text-lg">{stay.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                      ({stay.totalReviews} reviews)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                      <p className="text-muted-foreground text-sm mb-2">Check-in Date</p>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-transparent"
                      />
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                      <p className="text-muted-foreground text-sm mb-2">Check-out Date</p>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-transparent"
                      />
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                      <p className="text-muted-foreground text-sm mb-2">Number of Guests</p>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-transparent"
                      >
                        {[...Array(stay.maxGuests)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 flex flex-col">
                    <Suspense fallback={<ButtonSkeleton />}>
                      <PrimaryButton
                        className="w-full"
                        onClick={() => navigate(stay.bookingUrl || `/book/${stay.IdPage}`)}
                      >
                        Reserve Now
                      </PrimaryButton>
                    </Suspense>

                    <Suspense fallback={<ButtonSkeleton />}>
                      <SecondaryButton
                        onClick={() => setIsLiked(!isLiked)}
                        className="w-full"
                        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          className={`w-5 h-5 mr-2 ${isLiked ? "fill-current text-red-500" : ""}`}
                          aria-hidden="true"
                        />
                        {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                      </SecondaryButton>
                    </Suspense>
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
                    <a
                      href="mailto:stay@dahab.com"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                      aria-label="Email Dahab Stay"
                    >
                      <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate">
                        stay@dahab.com
                      </span>
                    </a>

                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                      aria-label="Call Dahab Stay"
                    >
                      <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        +123 456 7890
                      </span>
                    </a>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Shield className="w-5 h-5 text-amber-600 dark:text-amber-500" aria-hidden="true" />
                      <span>100% Secure Booking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Book With Us */}
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

        {/* Back Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <Link to="/stay">
            <Suspense fallback={<ButtonSkeleton />}>
              <PrimaryButton icon={ChevronLeft}>
                Back to All Stays
              </PrimaryButton>
            </Suspense>
          </Link>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      {/* Social Media Section */}
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
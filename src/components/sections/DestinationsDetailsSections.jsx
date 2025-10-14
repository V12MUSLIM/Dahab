"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  PrimaryButton,
  SecondaryButton,
} from "../customComponents/ButtonVarients";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import SocialMediaSection from "./SocialMediaSection";
import { useDestinations } from "@/hooks/useDestination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Clock,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Calendar,
  Award,
  Shield,
  Heart,
  Waves,
  Mountain,
  Compass,
  Check,
  Camera,
  ChevronLeft,
  Sun,
  ArrowRight,
  Navigation,
  ExternalLink,
  Fish,
  Wind,
  Sunrise,
  Car,
  Info,
  AlertCircle,
  Backpack,
  Coffee,
  Utensils,
} from "lucide-react";

const iconMap = {
  Waves,
  Camera,
  Shield,
  Mountain,
  Compass,
  Fish,
  Wind,
  Sunrise,
  Car,
  Backpack,
  Sun,
  Info,
  AlertCircle,
  Coffee,
  Utensils,
  Check,
  MapPin,
};

export default function DestinationDetail() {
  const { IdPage } = useParams();
  const { getDestinationById, toggleFavorite, isFavorite } = useDestinations();
  const destination = getDestinationById(IdPage);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black">
        <h1 className="text-3xl font-bold dark:text-white mb-4">
          Destination not found!
        </h1>
        <p className="text-muted-foreground mb-6">
          The destination you're looking for doesn't exist.
        </p>
        <Link to="/destinations">
          <PrimaryButton icon={ChevronLeft}>
            Back to All Destinations
          </PrimaryButton>
        </Link>
      </div>
    );
  }

  const googleMapsLink = destination.locationDetails
    ? `https://www.google.com/maps/search/?api=1&query=${destination.locationDetails.coordinates.lat},${destination.locationDetails.coordinates.lng}`
    : "";

  const handleFavoriteClick = () => {
    toggleFavorite(destination.id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
      {/* Hero Section */}
      <HeroSection
        imageURL={destination.imageUrl}
        title={destination.title}
        subtitle={destination.subtitle}
        Icon={Sun}
        badge={destination.badge}
        PrimaryButton={PrimaryButton}
        stats={[
          { icon: Clock, text: destination.duration },
          { icon: Users, text: destination.groupSize },
          { icon: Star, text: `${destination.rating}/5 Rating` },
        ]}
      />

      {/* Gallery Section */}
      <GallerySection
        images={destination.galleryImages || []}
        autoPlay={true}
        autoPlayInterval={2000}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badge & Description */}
            {destination.badge && (
              <motion.span
                className="inline-block bg-yellow-600 dark:bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {destination.badge}
              </motion.span>
            )}

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {destination.longDescription || destination.description}
            </motion.p>

            {/* Quick Info Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                  <CardTitle>Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {destination.duration}
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Users className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                  <CardTitle>Group Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {destination.groupSize}
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                  <CardTitle>Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {destination.rating}/5.0
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Mountain className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                  <CardTitle>Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {destination.difficulty}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location Section */}
            {destination.locationDetails && (
              <motion.div
                id="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                    <CardTitle>Location & How to Get There</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full h-64 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-6">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d${destination.locationDetails.coordinates.lng}!3d${destination.locationDetails.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${destination.locationDetails.coordinates.lat}!5e0!3m2!1sen!2seg!4v1234567890`}
                        allowFullScreen
                        loading="lazy"
                        title={`Map showing ${destination.title}`}
                      ></iframe>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>Address:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          {destination.locationDetails.address}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>Distance:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          {destination.locationDetails.distance}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>Access:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          {destination.locationDetails.access}
                        </p>
                      </div>

                      {destination.locationDetails.nearby &&
                        destination.locationDetails.nearby.length > 0 && (
                          <div>
                            <p className="text-muted-foreground mb-2">
                              <strong>Nearby Attractions:</strong>
                            </p>
                            <ul className="space-y-1">
                              {destination.locationDetails.nearby.map(
                                (place, idx) => (
                                  <li
                                    key={idx}
                                    className="text-muted-foreground"
                                  >
                                    • {place}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-500 hover:underline font-semibold mt-4"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Highlights Section */}
            {destination.highlights && destination.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                    <CardTitle>Experience Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Activities Grid */}
            {destination.activities && destination.activities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Activities Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {destination.activities.map((activity, index) => {
                    const IconComponent = iconMap[activity.icon] || Waves;
                    return (
                      <Card
                        key={index}
                        className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                      >
                        <CardHeader>
                          <IconComponent className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                          <CardTitle>{activity.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {activity.description}
                          </p>
                          {activity.difficulty && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Difficulty:</strong> {activity.difficulty}
                            </p>
                          )}
                          {activity.duration && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Duration:</strong> {activity.duration}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* What's Included */}
            {destination.included && destination.included.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.8 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Check className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-yellow-600 dark:bg-yellow-500 rounded-full"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reviews Section */}
            {destination.reviews && destination.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-6">Traveler Reviews</h2>
                <div className="space-y-4">
                  {destination.reviews.map((review, index) => (
                    <Card
                      key={index}
                      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <CardTitle className="text-lg">
                              {review.name}
                            </CardTitle>
                            {review.nationality && (
                              <CardDescription className="text-sm">
                                {review.nationality}
                              </CardDescription>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500"
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>{review.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                        {review.verified && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                            ✓ Verified Purchase
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Practical Information */}
            {destination.practicalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.8 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Info className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" />
                    <CardTitle>Practical Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {destination.practicalInfo.requirements &&
                        destination.practicalInfo.requirements.length > 0 && (
                          <div>
                            <h3 className="font-semibold mb-3">Requirements</h3>
                            <ul className="space-y-2">
                              {destination.practicalInfo.requirements.map(
                                (req, index) => {
                                  const ReqIcon = iconMap[req.icon] || Shield;
                                  return (
                                    <li
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      <ReqIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                                      <span className="text-muted-foreground">
                                        {req.text}
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}

                      {destination.practicalInfo.whatToBring &&
                        destination.practicalInfo.whatToBring.length > 0 && (
                          <div>
                            <h3 className="font-semibold mb-3">
                              What to Bring
                            </h3>
                            <ul className="space-y-2">
                              {destination.practicalInfo.whatToBring.map(
                                (item, index) => {
                                  const ItemIcon =
                                    iconMap[item.icon] || Backpack;
                                  return (
                                    <li
                                      key={index}
                                      className="flex items-start gap-3"
                                    >
                                      <ItemIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                                      <span className="text-muted-foreground">
                                        {item.text}
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}

                      {destination.practicalInfo.cancellation && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            <strong>Cancellation Policy:</strong>{" "}
                            {destination.practicalInfo.cancellation}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              id="booking"
              className="sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader className="text-center">
                  <CardDescription className="text-sm">
                    Starting from
                  </CardDescription>
                  <CardTitle className="text-4xl md:text-5xl font-black text-yellow-600 dark:text-yellow-500">
                    {destination.price}
                    <span className="text-xl font-normal text-muted-foreground">
                      /person
                    </span>
                  </CardTitle>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="w-5 h-5 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500" />
                    <span className="font-bold text-lg">
                      {destination.rating}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      (250+ reviews)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <p className="text-muted-foreground text-sm mb-2">
                        Best Time to Visit
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                        <span className="font-semibold">
                          {destination.bestTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <p className="text-muted-foreground text-sm mb-2">
                        Difficulty Level
                      </p>
                      <div className="flex items-center gap-2">
                        <Mountain className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                        <span className="font-semibold">
                          {destination.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 flex flex-col">
                    <PrimaryButton className="w-full">Book Now</PrimaryButton>

                    <SecondaryButton
                      onClick={handleFavoriteClick}
                      className="w-full"
                    >
                      <Heart
                        className={`w-5 h-5 mr-2 ${
                          isFavorite(destination.id)
                            ? "fill-current text-red-500"
                            : ""
                        }`}
                      />
                      {isFavorite(destination.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </SecondaryButton>
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
                    {/* Email Card */}
                    <div
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm 
    bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      <a
                        href="mailto:info@dahabtourism.com"
                        className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        info@dahabtourism.com
                      </a>
                    </div>

                    {/* Phone Card */}
                    <div
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm 
    bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      <a
                        href="tel:+20123456789"
                        className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        +20 123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
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
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Best price guarantee
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        24/7 customer support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Free cancellation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Experienced guides
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Small group sizes
                      </span>
                    </li>
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
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <Link to="/destinations">
            <PrimaryButton icon={ChevronLeft}>
              Back to All Destinations
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

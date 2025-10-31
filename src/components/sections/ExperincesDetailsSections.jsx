// sections/ExperienceDetailsSection.jsx
"use client";
import { lazy, Suspense, useState, memo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  MapPin, Clock, Users, Star, Calendar, Check, ChevronLeft,
  Shield, Award, Phone, Mail, Share2, Heart, TrendingUp,
  Sun, ExternalLink, Info
} from "lucide-react";
import { useExperience } from "@/context/ExperiencesContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  "24/7 customer support",
  "Free cancellation",
  "Experienced guides",
  "Small group sizes",
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
      Experience not found
    </h1>
    <p className="text-muted-foreground mb-6">
      The experience you're looking for doesn't exist.
    </p>
    <Link to="/experiences">
      <Suspense fallback={<ButtonSkeleton />}>
        <PrimaryButton icon={ChevronLeft}>
          Back to All Experiences
        </PrimaryButton>
      </Suspense>
    </Link>
  </div>
));

export default function ExperienceDetailsSection() {
  const { IdPage } = useParams();
  const navigate = useNavigate();
  const { getExperienceById, getRelatedExperiences } = useExperience();
  const [isLiked, setIsLiked] = useState(false);

  const experience = getExperienceById(IdPage);
  const relatedExperiences = getRelatedExperiences(IdPage);

  if (!experience) return <NotFoundState />;

  const googleMapsLink = experience.locationDetails
    ? `https://www.google.com/maps/search/?api=1&query=${experience.locationDetails.coordinates.lat},${experience.locationDetails.coordinates.lng}`
    : "";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection
          image={experience?.images?.[0]}
          title={experience.title}
          subtitle={experience.subtitle}
          Icon={Sun}
          badge={experience.badge}
          PrimaryButton={PrimaryButton}
          stats={[
            { icon: Clock, text: experience.duration },
            { icon: Users, text: experience.groupSize },
            { icon: Star, text: `${experience.rating}/5 Rating` },
          ]}
        />
      </Suspense>

      {/* Gallery Section */}
      {experience.galleryImages?.length > 0 && (
        <Suspense fallback={<SectionSkeleton />}>
          <GallerySection
            images={experience.galleryImages}
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
            {experience.badge && (
              <motion.span
                className="inline-block bg-yellow-600 dark:bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {experience.badge}
              </motion.span>
            )}

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {experience.fullDescription || experience.description}
            </motion.p>

            {/* Info Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {[
                { icon: Clock, title: "Duration", value: experience.duration },
                { icon: Users, title: "Group Size", value: experience.groupSize },
                { icon: Star, title: "Rating", value: `${experience.rating}/5.0` },
                { icon: TrendingUp, title: "Difficulty", value: experience.difficulty },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                >
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

            {/* Location */}
            {experience.locationDetails && (
              <motion.div
                id="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" aria-hidden="true" />
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
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d${experience.locationDetails.coordinates.lng}!3d${experience.locationDetails.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${experience.locationDetails.coordinates.lat}!5e0!3m2!1sen!2seg!4v1234567890`}
                        allowFullScreen
                        loading="lazy"
                        title={`Map showing ${experience.title}`}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-muted-foreground mb-2">
                          <strong>City:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          {experience.locationDetails.city}, {experience.locationDetails.region}
                        </p>
                      </div>

                      {experience.locationDetails.meetingPoint && (
                        <div>
                          <p className="text-muted-foreground mb-2">
                            <strong>Meeting Point:</strong>
                          </p>
                          <p className="text-muted-foreground">
                            {experience.locationDetails.meetingPoint}
                          </p>
                        </div>
                      )}

                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-500 hover:underline font-semibold mt-4"
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

            {/* Features */}
            {experience.features && experience.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" aria-hidden="true" />
                    <CardTitle>Experience Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {experience.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground">
                            {typeof feature === 'object' ? feature.title : feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* What's Included */}
            {experience.priceIncludes && experience.priceIncludes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CardHeader>
                    <Check className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-4" aria-hidden="true" />
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {experience.priceIncludes.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-yellow-600 dark:bg-yellow-500 rounded-full" aria-hidden="true" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
              <Card className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 border-yellow-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <CardHeader className="text-center">
                  <CardDescription className="text-sm">Starting from</CardDescription>
                  <CardTitle className="text-4xl md:text-5xl font-black text-yellow-600 dark:text-yellow-500">
                    {experience.price}
                    <span className="text-xl font-normal text-muted-foreground">/person</span>
                  </CardTitle>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="w-5 h-5 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500" aria-hidden="true" />
                    <span className="font-bold text-lg">{experience.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                      ({experience.totalReviews || '250+'} reviews)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {experience.availableTimes && experience.availableTimes.length > 0 && (
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                        <p className="text-muted-foreground text-sm mb-2">Available Times</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                          <span className="font-semibold">{experience.availableTimes.join(", ")}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <p className="text-muted-foreground text-sm mb-2">Difficulty Level</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
                        <span className="font-semibold">{experience.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 flex flex-col">
                    <Suspense fallback={<ButtonSkeleton />}>
                      <PrimaryButton
                        className="w-full"
                        onClick={() => navigate(experience.bookingUrl || `/book/${experience.IdPage}`)}
                      >
                        Book Now
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
                      href="mailto:info@dahabtourism.com"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                      aria-label="Email Dahab Tourism"
                    >
                      <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate">
                        info@dahabtourism.com
                      </span>
                    </a>

                    <a
                      href="tel:+20123456789"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-500/50 shadow-sm bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-[1.02] w-full"
                      aria-label="Call Dahab Tourism"
                    >
                      <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        +20 123 456 789
                      </span>
                    </a>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
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
          <Link to="/experiences">
            <Suspense fallback={<ButtonSkeleton />}>
              <PrimaryButton icon={ChevronLeft}>
                Back to All Experiences
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

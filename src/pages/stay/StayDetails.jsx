"use client";

import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Bed,
  Users,
  Award,
  ChevronLeft,
  Hotel,
  Wifi,
  Wind,
  Coffee,
  Home,
} from "lucide-react";

import { useStay } from "@/hooks/useStay";
import DahabLoader from "@/components/Loading";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Keep gallery as-is: lazy + Suspense
import { lazy, Suspense } from "react";
const GallerySection = lazy(() =>
  import("@/components/sections/GallerySection")
);

// Regular imports for other sections
import HeroSection from "@/components/sections/HeroSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";

// Stay subcomponents
import StayInfoCards from "@/components/stay/StayInfoCard";
import RoomTypesSection from "@/components/stay/RoomTypesSection";
import LocationSection from "@/components/stay/LocationSection";
import AmenitiesSection from "@/components/stay/AmenitiesSection";
import IncludedSection from "@/components/stay/IncludedSection";
import PoliciesSection from "@/components/stay/PoliciesSection";
import BookingCard, {
  MobileBookingBar,
} from "@/components/stay/BookingCard";

// Amenity icon mapping
const AMENITY_ICONS = {
  "Free WiFi": Wifi,
  "Air Conditioning": Wind,
  Restaurant: Coffee,
  Bar: Coffee,
  "Private Beach": Home,
};

export default function StayDetailsSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: stays, isLoading, error } = useStay();

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const bookingRef = useRef(null);

  const stay = stays?.find((s) => s.IdPage === id);

  const scrollToBooking = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleReserve = ({ checkIn, checkOut, guests }) => {
    if (!stay) return;
    const room = stay.roomTypes[selectedRoomIndex];

    navigate("/booking", {
      state: {
        type: "stay",
        item: stay,
        room,
        bookingDetails: { checkIn, checkOut, guests },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <DahabLoader loadingMessage="Loading stay details..." />
      </div>
    );
  }

  if (error || !stay) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold">Stay not found</p>
        <Link to="/stay">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to all stays
          </Button>
        </Link>
      </div>
    );
  }

  const infoCards = [
    { icon: Star, title: "Rating", value: `${stay.rating}/5.0` },
    { icon: Bed, title: "Rooms", value: `${stay.totalRooms} available` },
    { icon: Users, title: "Capacity", value: `Up to ${stay.maxGuests}` },
    { icon: Award, title: "Category", value: `${stay.starRating} Star` },
  ];

  const googleMapsLink = stay.locationDetails
    ? `https://www.google.com/maps/search/?api=1&query=${stay.locationDetails.coordinates.lat},${stay.locationDetails.coordinates.lng}`
    : "";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-24 lg:pb-16">
      {/* HERO */}
      <HeroSection
        image={stay?.images?.[0]}
        title={stay.name}
        subtitle={stay.subtitle}
        Icon={Hotel}
        badge={stay.badge}
        onPrimaryClick={scrollToBooking}
        primaryLabel="Book now"
        stats={[
          { icon: Star, text: `${stay.rating}/5 Rating` },
          { icon: MapPin, text: stay.location },
          { icon: Bed, text: `${stay.totalRooms} Rooms` },
        ]}
      />

      {/* GALLERY (kept as-is, lazy) */}
      {stay.galleryImages?.length > 0 && (
        <Suspense fallback={null}>
          <GallerySection
            images={stay.galleryImages}
            autoPlay
            autoPlayInterval={2000}
          />
        </Suspense>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 lg:gap-10">
          {/* LEFT: content with tabs */}
          <div className="space-y-6">
            {/* Top action row */}
            <div className="flex items-center justify-between gap-4">
              {stay.badge && (
                <span className="inline-flex items-center rounded-full bg-amber-600/10 text-amber-700 dark:text-amber-300 px-4 py-1 text-sm font-medium">
                  {stay.badge}
                </span>
              )}

              <Link to="/stay" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to all stays
                </Button>
              </Link>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              {/* OVERVIEW */}
              <TabsContent value="overview" className="space-y-6 pt-4">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl leading-relaxed text-muted-foreground"
                >
                  {stay.fullDescription || stay.description}
                </motion.p>

                <StayInfoCards items={infoCards} />
              </TabsContent>

              {/* ROOMS */}
              <TabsContent value="rooms" className="pt-4">
                <RoomTypesSection
                  rooms={stay.roomTypes}
                  selectedIndex={selectedRoomIndex}
                  onSelect={setSelectedRoomIndex}
                  onBookClick={scrollToBooking}
                />
              </TabsContent>

              {/* LOCATION */}
              <TabsContent value="location" className="pt-4">
                <LocationSection
                  locationDetails={stay.locationDetails}
                  googleMapsLink={googleMapsLink}
                />
              </TabsContent>

              {/* AMENITIES */}
              <TabsContent value="amenities" className="pt-4 space-y-6">
                <AmenitiesSection
                  amenities={stay.amenities}
                  amenityIcons={AMENITY_ICONS}
                />
                <IncludedSection items={stay.priceIncludes} />
              </TabsContent>

              {/* POLICIES */}
              <TabsContent value="policies" className="pt-4">
                <PoliciesSection
                  checkInTime={stay.checkInTime}
                  checkOutTime={stay.checkOutTime}
                  policies={stay.policies}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT: booking */}
          <div
            ref={bookingRef}
            id="booking-section"
            className="lg:sticky lg:top-24 h-fit"
          >
            <BookingCard
              stayName={stay.name}
              basePrice={stay.roomTypes[selectedRoomIndex].price}
              rating={stay.rating}
              reviews={stay.totalReviews}
              maxGuests={stay.maxGuests}
              onReserve={handleReserve}
            />
          </div>
        </div>

        {/* Back button for mobile (under content) */}
        <div className="mt-8 sm:hidden">
          <Link to="/stay" className="block">
            <Button variant="ghost" className="w-full justify-center">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to all stays
            </Button>
          </Link>
        </div>
      </div>

      {/* GLOBAL SECTIONS */}
      <TestimonialsSection />
      <FAQSection />
      <SocialMediaSection
        badge="Connect"
        header="Stay Connected"
        description="Follow our journey and stay updated with the latest from Dahab"
      />

      {/* MOBILE BOOKING BAR */}
      <MobileBookingBar
        stayName={stay.name}
        price={stay.roomTypes[selectedRoomIndex].price}
        onBookClick={scrollToBooking}
      />
    </div>
  );
}

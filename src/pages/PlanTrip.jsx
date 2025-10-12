import HeroSection from "@/components/sections/HeroSection";
import { Calendar, MapPin, Plane, CheckCircle } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/customComponents/ButtonVarients";
import PackageDealsSection from "@/components/sections/PackageDealsSection";
import FeaturedDestinationsSection from "@/components/sections/FeaturedDestinationsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CustomTripSection from "@/components/sections/CustomTripSection";

export default function PlanTrip() {
  const packages = [
    {
      title: "Adventure Seeker",
      price: "$299",
      duration: "3 Days",
      features: [
        "Blue Hole diving experience",
        "Desert safari with Bedouin dinner",
        "Snorkeling at Three Pools",
        "Rock climbing session",
        "All equipment included",
      ],
      popular: true,
    },
    {
      title: "Relaxation Retreat",
      price: "$249",
      duration: "4 Days",
      features: [
        "Beachfront accommodation",
        "Daily yoga sessions",
        "Spa treatment package",
        "Lagoon day trip",
        "Sunset meditation",
      ],
      popular: false,
    },
    {
      title: "Ultimate Explorer",
      price: "$599",
      duration: "7 Days",
      features: [
        "Advanced diving package",
        "Mount Sinai overnight trek",
        "Colored Canyon expedition",
        "Windsurfing lessons",
        "Photography workshop",
      ],
      popular: false,
    },
    {
      title: "Family Fun",
      price: "$399",
      duration: "5 Days",
      features: [
        "Family-friendly hotel stay",
        "Glass-bottom boat trip",
        "Camel ride by the beach",
        "Kids snorkeling lessons",
        "Evening campfire with storytelling",
      ],
      popular: false,
    },
    {
      title: "Cultural Journey",
      price: "$349",
      duration: "4 Days",
      features: [
        "Guided Dahab town tour",
        "Visit to St. Catherine’s Monastery",
        "Traditional cooking class",
        "Handicraft market experience",
        "Bedouin music night",
      ],
      popular: false,
    },
    {
      title: "Luxury Escape",
      price: "$899",
      duration: "6 Days",
      features: [
        "5-star beachfront resort stay",
        "Private yacht excursion",
        "Exclusive spa treatments",
        "Fine dining experiences",
        "Personal tour guide",
      ],
      popular: true,
    },
    {
      title: "Eco Adventure",
      price: "$329",
      duration: "3 Days",
      features: [
        "Eco-lodge accommodation",
        "Beach cleanup activity",
        "Sustainable diving/snorkeling",
        "Stargazing in the desert",
        "Organic Bedouin meals",
      ],
      popular: false,
    },
    {
      title: "Budget Backpacker",
      price: "$179",
      duration: "3 Days",
      features: [
        "Hostel accommodation",
        "Group snorkeling trip",
        "Desert jeep tour",
        "Shared meals experience",
        "Guided hiking trails",
      ],
      popular: false,
    },
    {
      title: "Couples’ Paradise",
      price: "$499",
      duration: "4 Days",
      features: [
        "Romantic beachfront chalet",
        "Private sunset boat ride",
        "Couples spa therapy",
        "Candlelight dinner by the sea",
        "Personalized photography session",
      ],
      popular: true,
    },
  ];

  return (
    <>
      <HeroSection
        image="image1.webp"
        title={
          <span>
            Plan Your <span className="text-amber-500">Dream Trip</span>
          </span>
        }
        subtitle="From crystal-clear waters to golden deserts — craft your perfect Dahab journey with ease."
        Icon={Calendar}
        badge="Plan & Book"
        PrimaryButton={PrimaryButton}
        SecondaryButton={SecondaryButton}
        primaryCta={{
          label: "Start Planning",
          onClick: () => {
            document
              .getElementById("custom")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
          icon: CheckCircle,
        }}
        secondaryCta={{
          label: "Discover Destinations",
          onClick: () => {
            document
              .getElementById("discover")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
          icon: MapPin,
        }}
        stats={[
          { icon: Plane, text: "Easy Booking" },
          { icon: Calendar, text: "Flexible Dates" },
          { icon: CheckCircle, text: "Trusted Guides" },
        ]}
      />

      <PackageDealsSection
        packages={packages}
        badge="Special Offers"
        header="Exclusive Package Deals"
        description="Choose from our carefully curated packages for an unforgettable Dahab experience."
      />

      <FeaturedDestinationsSection id="discover" />
      <ActivitiesSection />
      <TestimonialsSection />
      <CustomTripSection id="custom" className="min-h-screen" />
    </>
  );
}

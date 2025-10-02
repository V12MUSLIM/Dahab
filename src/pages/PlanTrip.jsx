import HeroSection from "@/components/sections/HeroSection";
import { Calendar, MapPin, Plane, CheckCircle } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/customComponents/ButtonVarients";
import PackageDealsSection from "@/components/sections/PackageDealsSection";
import FeaturedDestinationsSection from "@/components/sections/FeaturedDestinationsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CustomTripSection from "@/components/sections/CustomTripSection";
export default function planTrip() {
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
  ];
  return (
    <>
      <HeroSection
        image="image1.jpeg"
        title="Plan Your Dream Trip"
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
        badge="Spechial ffers"
        header="Exclusive Packages Deals"
        description="   Choose from our carefully curated packages for an unforgettable
                   Dahab experience"
      />
      <FeaturedDestinationsSection id={"discover"} />
      <ActivitiesSection />
      <TestimonialsSection />
      <CustomTripSection id="custom" className="min-h-screen" />
    </>
  );
}

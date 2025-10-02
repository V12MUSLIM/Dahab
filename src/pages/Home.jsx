import HeroSection from "../components/sections/HeroSection";
import GallerySection from "../components/sections/GallerySection";
import PackageDealsSection from "../components/sections/PackageDealsSection";
import FeaturedDestinationsSection from "../components/sections/FeaturedDestinationsSection";
import ActivitiesSection from "../components/sections/ActivitiesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
import ContactSection from "../components/sections/ContactSection";
import { Sun, Anchor, Star, ArrowRight, Calendar } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../components/customComponents/ButtonVarients"
export default function Home() {
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
    <div className="min-h-screen bg-background overflow-x-hidden">
       <HeroSection
      image="hero.png"
      title="Dahab"
      subtitle="Red Sea Paradise — Where Adventure, Relaxation, and Culture Unite"
      Icon={Sun}
      badge="Sunny Escape"
      PrimaryButton={PrimaryButton}
      SecondaryButton={SecondaryButton}
      primaryCta={{ label: "Explore All", href: "/experiences", icon: ArrowRight }}
      secondaryCta={{ label: "Plan Your Trip", href: "/plantrip", icon: Calendar }}
      stats={[
        { icon: Sun, text: "330+ Sunny Days" },
        { icon: Anchor, text: "25+ Dive Sites" },
        { icon: Star, text: "4.9/5 Rating" },
      ]}
    />
      <GallerySection 
        badge="Gallery"
        header=" Discover Dahab's Beauty "
        paragraph="From pristine beaches to vibrant coral reefs, experience the magic
              of Egypt's coastal gem "
      />
      <PackageDealsSection
        packages={packages}
        badge="Special Offers"
        header="Exclusive Packages Deals"
        description="   Choose from our carefully curated packages for an unforgettable
            Dahab experience"
      />
      <FeaturedDestinationsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}

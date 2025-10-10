import { usePackages } from "../hooks/usePackages";
import { useActivities } from "../hooks/useActivities";

import PackageDealsSection from "../components/sections/PackageDealsSection";
import HeroSection from "../components/sections/HeroSection";
import GallerySection from "../components/sections/GallerySection";
import FeaturedDestinationsSection from "../components/sections/FeaturedDestinationsSection";
import ActivitiesSection from "../components/sections/ActivitiesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
import ContactSection from "../components/sections/ContactSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import ApiError from "@/components/apiStatue/ApiError";
// Import skeleton components
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

import {
  Sun,
  Anchor,
  Star,
  ArrowRight,
  Calendar,
  Waves,
  Camera,
  Mountain,
  TriangleAlert,
} from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/customComponents/ButtonVarients";

export default function Home() {
  const {
    data: packages,
    isLoading: packagesLoading,
    error: packagesError,
  } = usePackages();

  const {
    data: activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useActivities();

  const isLoading = packagesLoading || activitiesLoading;
  const error = packagesError || activitiesError;

  // Fallback data for packages
  const fallbackPackages = [
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

  // Fallback data for activities
  const fallbackActivities = [
    {
      title: "Scuba Diving",
      description:
        "Explore the underwater paradise of the Red Sea with professional guides",
      icon: Waves,
      duration: "Half Day",
      groupSize: "8 people",
      difficulty: "All Levels",
      price: "$75",
    },
    {
      title: "Desert Safari",
      description:
        "Experience authentic Bedouin culture on a magical desert journey",
      icon: Camera,
      duration: "Full Day",
      groupSize: "12 people",
      difficulty: "Easy",
      price: "$60",
    },
    {
      title: "Rock Climbing",
      description:
        "Challenge yourself on the stunning limestone cliffs of South Sinai",
      icon: Mountain,
      duration: "4 hours",
      groupSize: "6 people",
      difficulty: "Intermediate",
      price: "$65",
    },
    {
      title: "Windsurfing",
      description:
        "Perfect winds and conditions make Dahab a windsurfing paradise",
      icon: Waves,
      duration: "3 hours",
      groupSize: "4 people",
      difficulty: "Beginner+",
      price: "$50",
    },
  ];

  // Show skeleton loading state
  if (isLoading) {
    return <PageSkeleton />;
  }
 // show Error state
  if (error) {
    return <ApiError />;
  }

  const galleryImages = [
    {
      src: `${import.meta.env.BASE_URL}image1.jpeg`,
      alt: "Blue Lagoon in Dahab",
      title: "Blue Lagoon Paradise",
      description: "Crystal clear waters perfect for swimming",
    },
    {
      src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg",
      alt: "Blue Hole diving spot",
      title: "Famous Blue Hole",
      description: "World's most iconic diving destination",
    },
    {
      src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg",
      alt: "Dahab coastline",
      title: "Stunning Coastline",
      description: "Miles of pristine beaches await",
    },
    {
      src: "https://assets.annahar.com/ContentFilesArchive/422721Image1-1180x677_d.jpg",
      alt: "Desert meets sea",
      title: "Desert Meets Sea",
      description: "Unique landscape of mountains and ocean",
    },
    {
      src: `${import.meta.env.BASE_URL}image2.jpeg`,
      alt: "Sinai mountains sunset",
      title: "Sinai Mountain Sunset",
      description: "Breathtaking views from sacred peaks",
    },
    {
      src: `${import.meta.env.BASE_URL}image3.jpeg`,
      alt: "Blue Hole diving",
      title: "World-Class Diving",
      description: "Explore vibrant coral reefs",
    },
    {
      src: `${import.meta.env.BASE_URL}image4.jpeg`,
      alt: "Bedouin beach camp",
      title: "Bedouin Beach Culture",
      description: "Experience authentic local traditions",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection
        image="hero.png"
        title="Dahab"
        subtitle="Red Sea Paradise – Where Adventure, Relaxation, and Culture Unite"
        Icon={Sun}
        badge="Sunny Escape"
        PrimaryButton={PrimaryButton}
        SecondaryButton={SecondaryButton}
        primaryCta={{
          label: "Explore All",
          href: "/experiences",
          icon: ArrowRight,
        }}
        secondaryCta={{
          label: "Plan Your Trip",
          href: "/plantrip",
          icon: Calendar,
        }}
        stats={[
          { icon: Sun, text: "330+ Sunny Days" },
          { icon: Anchor, text: "25+ Dive Sites" },
          { icon: Star, text: "4.9/5 Rating" },
        ]}
      />

      <GallerySection
        badge="Explore Dahab"
        header="Discover Paradise"
        paragraph="Experience the stunning beauty of Dahab through our curated gallery"
        images={galleryImages}
        autoPlay={true}
        autoPlayInterval={2500}
      />

      <PackageDealsSection
        packages={packages || fallbackPackages}
        badge="Special Offers"
        header="Exclusive Packages Deals"
        description="Choose from our carefully curated packages for an unforgettable Dahab experience"
      />

      <FeaturedDestinationsSection />

      <ActivitiesSection
        badge="Activities"
        header="Adventures Await"
        description="From underwater exploration to desert adventures, discover the activities that make Dahab special"
        activities={activities || fallbackActivities}
      />

      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />

      <SocialMediaSection
        badge="Connect"
        header="Stay Connected"
        description="Follow our journey and stay updated with the latest from Dahab"
      />
    </div>
  );
}

// src/pages/Home.jsx
import { lazy, Suspense } from "react";
import { usePackages } from "../hooks/usePackages";
import { useActivities } from "../hooks/useActivities";
import { useHero } from "../hooks/useHero";

import HeroSection from "../components/sections/HeroSection";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";

const GallerySection = lazy(() =>
  import("../components/sections/GallerySection")
);
const PackageDealsSection = lazy(() =>
  import("../components/sections/PackageDealsSection")
);
const FeaturedDestinationsSection = lazy(() =>
  import("../components/sections/FeaturedDestinationsSection")
);
const ActivitiesSection = lazy(() =>
  import("../components/sections/ActivitiesSection")
);
const TestimonialsSection = lazy(() =>
  import("../components/sections/TestimonialsSection")
);
const FAQSection = lazy(() => import("../components/sections/FAQSection"));
const CTASection = lazy(() => import("../components/sections/CTASection"));
const ContactSection = lazy(() =>
  import("../components/sections/ContactSection")
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

import {
  Sun,
  Anchor,
  Star,
  ArrowRight,
  Calendar,
  Waves,
  Camera,
  Mountain,
} from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/customComponents/ButtonVarients";

const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const iconMap = {
  Waves,
  Camera,
  Mountain,
  Sun,
  Anchor,
  Star,
  ArrowRight,
  Calendar,
};

export default function Home() {
  // Queries
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
  const { data: hero, isLoading: heroLoading, error: heroError } = useHero();

  // Normalize hero (endpoint returns array)
  const heroObj = Array.isArray(hero) ? hero[0] : hero;

  const isLoading = packagesLoading || activitiesLoading || heroLoading;

  // Fallback hero
  const fallbackHero = {
    image: "hero.webp",
    title: "Dahab",
    subtitle:
      "Red Sea Paradise – Where Adventure, Relaxation, and Culture Unite",
    icon: "Sun",
    badge: "Sunny Escape",
    primaryCta: {
      label: "Explore All",
      icon: "ArrowRight",
      href: "/experiences",
    },
    secondaryCta: {
      label: "Plan Your Trip",
      icon: "Calendar",
      href: "/plantrip",
    },
    stats: [
      { icon: "Sun", text: "330+ Sunny Days" },
      { icon: "Anchor", text: "25+ Dive Sites" },
      { icon: "Star", text: "4.9/5 Rating" },
    ],
  };

  const displayHero = heroObj || fallbackHero;

  // Fallback packages
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

  // Fallback activities
  const fallbackActivities = [
    {
      title: "Scuba Diving",
      description:
        "Explore the underwater paradise of the Red Sea with professional guides",
      icon: Waves,
      duration: "Half Day",
      groupSize: "8 people",
      difficulty: "All Levels",
      price: "75",
    },
    {
      title: "Desert Safari",
      description:
        "Experience authentic Bedouin culture on a magical desert journey",
      icon: Camera,
      duration: "Full Day",
      groupSize: "12 people",
      difficulty: "Easy",
      price: "60",
    },
    {
      title: "Rock Climbing",
      description:
        "Challenge yourself on the stunning limestone cliffs of South Sinai",
      icon: Mountain,
      duration: "4 hours",
      groupSize: "6 people",
      difficulty: "Intermediate",
      price: "65",
    },
    {
      title: "Windsurfing",
      description:
        "Perfect winds and conditions make Dahab a windsurfing paradise",
      icon: Waves,
      duration: "3 hours",
      groupSize: "4 people",
      difficulty: "Beginner+",
      price: "50",
    },
  ];

  const displayPackages = packages?.packages || fallbackPackages;

  const displayActivities = activities
    ? activities.map((a) => ({
        ...a,
        icon: iconMap[a.icon] || Waves,
      }))
    : fallbackActivities;

  // First load skeleton
  if (isLoading && !packages && !activities && !hero) {
    return <PageSkeleton />;
  }

  const showWarning =
    (packagesError || activitiesError || heroError) && !isLoading;

  const galleryImages = [
    {
      src: "image1.webp",
      alt: "Desert meets sea",
      title: "Desert Meets Sea",
      description: "Unique landscape of mountains and ocean",
    },
    {
      src: "image2.webp",
      alt: "Sinai mountains sunset",
      title: "Sinai Mountain Sunset",
      description: "Breathtaking views from sacred peaks",
    },
    {
      src: "image3.webp",
      alt: "Blue Hole diving",
      title: "World-Class Diving",
      description: "Explore vibrant coral reefs",
    },
    {
      src: "image4.webp",
      alt: "Bedouin beach camp",
      title: "Bedouin Beach Culture",
      description: "Experience authentic local traditions",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showWarning && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center">
          <p className="text-sm text-yellow-800">
            Some content is currently unavailable. Showing cached information.
          </p>
        </div>
      )}

      {/* Hero */}
      <HeroSection
        image={displayHero?.image}
        imageSm="hero-small.webp"
        imageMd="hero-medium.webp"
        title={displayHero?.title}
        subtitle={displayHero?.subtitle}
        Icon={displayHero?.icon}
        badge={displayHero?.badge}
        stats={displayHero?.stats ?? []}
        primaryCta={displayHero?.primaryCta}
        secondaryCta={displayHero?.secondaryCta}
        PrimaryButton={PrimaryButton}
        SecondaryButton={SecondaryButton}
      />

      {/* Gallery */}
      <Suspense fallback={<SectionLoader />}>
        <GallerySection
          badge="Explore Dahab"
          header="Discover Paradise"
          paragraph="Experience the stunning beauty of Dahab through our curated gallery"
          images={galleryImages}
          autoPlay
          autoPlayInterval={2500}
        />
      </Suspense>

      {/* Packages */}
      <Suspense fallback={<SectionLoader />}>
        <PackageDealsSection
          packages={displayPackages}
          badge="Special Offers"
          header="Exclusive Packages Deals"
          description="Choose from our carefully curated packages for an unforgettable Dahab experience"
        />
      </Suspense>

      {/* Featured */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedDestinationsSection />
      </Suspense>

      {/* Activities */}
      <Suspense fallback={<SectionLoader />}>
        <ActivitiesSection
          badge="Activities"
          header="Adventures Await"
          description="From underwater exploration to desert adventures, discover the activities that make Dahab special"
          activities={displayActivities}
        />
      </Suspense>

      {/* Grouped non-critical */}
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
        />
      </Suspense>
    </div>
  );
}

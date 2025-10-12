import { lazy, Suspense } from "react";
import { usePackages } from "../hooks/usePackages";
import { useActivities } from "../hooks/useActivities";

// Eager load - Above the fold components
import HeroSection from "../components/sections/HeroSection";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import ApiError from "@/components/apiStatue/ApiError";

// Lazy load - Below the fold components
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

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

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

  // Use fallback data if API fails, otherwise use API data
  const displayPackages = packages || fallbackPackages;
  const displayActivities = activities || fallbackActivities;

  // Show skeleton loading state only on initial load
  if (isLoading && !packages && !activities) {
    return <PageSkeleton />;
  }

  // Optional: Show a subtle warning banner if data failed to load but page is still functional
  const showWarning = (packagesError || activitiesError) && !isLoading;

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
      {/* Optional warning banner */}
      {showWarning && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center">
          <p className="text-sm text-yellow-800">
            Some content is currently unavailable. Showing cached information.
          </p>
        </div>
      )}

      {/* Hero Section - Loaded immediately (above the fold) */}
      <HeroSection
        image="hero.webp"
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

      {/* Gallery Section - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <GallerySection
          badge="Explore Dahab"
          header="Discover Paradise"
          paragraph="Experience the stunning beauty of Dahab through our curated gallery"
          images={galleryImages}
          autoPlay={true}
          autoPlayInterval={2500}
        />
      </Suspense>

      {/* Package Deals Section - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <PackageDealsSection
          packages={displayPackages}
          badge="Special Offers"
          header="Exclusive Packages Deals"
          description="Choose from our carefully curated packages for an unforgettable Dahab experience"
        />
      </Suspense>

      {/* Featured Destinations Section - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedDestinationsSection />
      </Suspense>

      {/* Activities Section - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <ActivitiesSection
          badge="Activities"
          header="Adventures Await"
          description="From underwater exploration to desert adventures, discover the activities that make Dahab special"
          activities={displayActivities}
        />
      </Suspense>

      {/* Group non-critical sections together in one Suspense boundary */}
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

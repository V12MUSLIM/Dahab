// src/pages/Home.jsx
import { lazy, Suspense } from "react";
import { usePackages } from "../hooks/usePackages";
import { useActivities } from "../hooks/useActivities";
import { useHero } from "../hooks/useHero";

import HeroSection from "../components/sections/HeroSection";
import { PageSkeleton } from "@/components/skeletons/PageSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Compass, MapPin } from "lucide-react";

const DahabExperience = lazy(() =>
  import("../components/sections/DahabExperience")
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
const IntroSection = lazy(() => import("@/components/sections/IntroSection"));
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
        subtitle={displayHero?.subtitle}
        Icon={displayHero?.icon}
        stats={displayHero?.stats ?? []}
        primaryCta={displayHero?.primaryCta}
        secondaryCta={displayHero?.secondaryCta}
        PrimaryButton={PrimaryButton}
        SecondaryButton={SecondaryButton}
        showSearchBar
      />

      {/* Gallery */}
      <Suspense fallback={<SectionLoader />}>
        <IntroSection
          badge="Timeless History"
          smText="Endless Blue Horizons"
          subtitle="Journey across continents, cultures, and landscapes—because every path leads to new discoveries."
          images={galleryImages}
          autoPlay={true}
          autoPlayInterval={2000}
        />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DahabExperience />
      </Suspense>

      {/* Tabbed Section: Packages, Activities, Featured */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="packages" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-auto p-1 bg-muted/50">
              <TabsTrigger 
                value="packages" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600 data-[state=active]:border-amber-500"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Packages</span>
              </TabsTrigger>
              <TabsTrigger 
                value="activities"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600 data-[state=active]:border-amber-500"
              >
                <Compass className="h-4 w-4" />
                <span className="hidden sm:inline">Activities</span>
              </TabsTrigger>
              <TabsTrigger 
                value="featured"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600 data-[state=active]:border-amber-500"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Featured</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="packages" className="mt-0">
              <Suspense fallback={<SectionLoader />}>
                <PackageDealsSection
                  packages={displayPackages}
                  badge="Special Offers"
                  header="Exclusive Package Deals"
                  description="Choose from our carefully curated packages for an unforgettable Dahab experience"
                />
              </Suspense>
            </TabsContent>

            <TabsContent value="activities" className="mt-0">
              <Suspense fallback={<SectionLoader />}>
                <ActivitiesSection
                  badge="Activities"
                  header="Adventures Await"
                  description="From underwater exploration to desert adventures, discover the activities that make Dahab special"
                  activities={displayActivities}
                />
              </Suspense>
            </TabsContent>

            <TabsContent value="featured" className="mt-0">
              <Suspense fallback={<SectionLoader />}>
                <FeaturedDestinationsSection />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </section>

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

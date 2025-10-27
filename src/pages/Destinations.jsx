"use client";

import { useState, lazy, Suspense, useMemo, useDeferredValue, useEffect } from "react";
import { useDestinations } from "@/hooks/useDestination";
import { Search, MapPin, Compass, Star, Users } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { PrimaryButton } from "@/components/customComponents/ButtonVarients";
import Filters from "@/components/customComponents/FilteringTool";

const DestinationCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((m) => ({
    default: m.DestinationCard,
  }))
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

const SectionDestinationsLoading = () => (
  <div className="w-full h-32 flex items-center justify-center" role="status" aria-label="Loading destinations">
    <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mx-auto" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
  </div>
);

const PageSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4" />
      <p className="text-lg text-muted-foreground">Loading destinations...</p>
    </div>
  </div>
);

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const {
    destinations: apiDestinations,
    getAllCategories: apiGetAllCategories,
    getDestinationsByCategory: apiGetDestinationsByCategory,
    isLoading,
    error,
  } = useDestinations();

  const fallbackDestinations = [
    {
      id: 1,
      category: "Water Adventures",
      title: "Blue Hole",
      description: "World-famous diving spot with crystal clear water and vibrant marine life.",
      imageUrl: "/Dahab/blue-hole.webp",
      href: "/destinations/blue-hole",
      IdPage: "blue-hole",
      subtitle: "World Famous Dive Site",
      badge: "Must Visit",
      rating: "4.9",
      location: "Dahab Coast",
      price: "$85",
      galleryImages: [{ src: "/Dahab/blue-hole.webp" }],
    },
    {
      id: 2,
      category: "Water Adventures",
      title: "Dahab Lagoon",
      description: "Perfect spot for windsurfing and kitesurfing with shallow calm waters.",
      imageUrl: "/Dahab/dahab-lagoon.webp",
      href: "/destinations/dahab-lagoon",
      IdPage: "dahab-lagoon",
      subtitle: "Windsurfing & Kitesurfing Paradise",
      badge: "Water Sports",
      rating: "4.6",
      location: "North Dahab",
      price: "$60",
      galleryImages: [{ src: "/Dahab/dahab-lagoon.webp" }],
    },
    {
      id: 3,
      category: "Water Adventures",
      title: "Three Pools Snorkeling",
      description: "Three natural lagoons with incredible coral gardens and marine life.",
      imageUrl: "/Dahab/three-pools.webp",
      href: "/destinations/three-pools",
      IdPage: "three-pools",
      subtitle: "Hidden Snorkeling Paradise",
      badge: "Snorkeling",
      rating: "4.8",
      location: "North Dahab",
      price: "$35",
      galleryImages: [{ src: "/Dahab/three-pools.webp" }],
    },
  ];

  const destinations = useMemo(() => {
    return Array.isArray(apiDestinations) && apiDestinations.length > 0
      ? apiDestinations
      : fallbackDestinations;
  }, [apiDestinations]);

  const categories = useMemo(() => {
    const apiCats =
      apiDestinations && typeof apiGetAllCategories === "function"
        ? apiGetAllCategories()
        : null;
    const finalCats =
      apiCats && Array.isArray(apiCats) && apiCats.length > 0
        ? apiCats
        : [...new Set(fallbackDestinations.map((d) => d.category).filter(Boolean))];
    return ["All", ...finalCats];
  }, [apiDestinations, apiGetAllCategories]);

  const categoryOptions = useMemo(() => {
    return categories.map(cat => ({
      value: cat,
      label: cat
    }));
  }, [categories]);

  const getByCategory = (category) => {
    if (category === "All") return destinations;
    if (apiDestinations && typeof apiGetDestinationsByCategory === "function") {
      const list = apiGetDestinationsByCategory(category);
      if (Array.isArray(list)) return list;
    }
    return fallbackDestinations.filter((d) => d.category === category);
  };

  const normalizePrice = (val) => {
    if (val == null) return NaN;
    if (typeof val === "number") return val;
    const m = String(val).match(/\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  };

  const deferredSearch = useDeferredValue(searchQuery);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(deferredSearch.trim().toLowerCase()),
      200
    );
    return () => clearTimeout(timer);
  }, [deferredSearch]);

  const filteredDestinations = useMemo(() => {
    let list =
      selectedCategory === "All" ? destinations : getByCategory(selectedCategory);

    if (debouncedSearch) {
      const q = debouncedSearch;
      list = list.filter((dest) => {
        const title = dest.title?.toLowerCase() || "";
        const desc = dest.description?.toLowerCase() || "";
        const loc = dest.location?.toLowerCase() || "";
        return title.includes(q) || desc.includes(q) || loc.includes(q);
      });
    }

    if (priceFilter !== "all") {
      list = list.filter((dest) => {
        const price = normalizePrice(dest.price);
        if (Number.isNaN(price)) return false;
        if (priceFilter === "low") return price < 50;
        if (priceFilter === "medium") return price >= 50 && price < 80;
        if (priceFilter === "high") return price >= 80;
        return true;
      });
    }

    return list;
  }, [destinations, selectedCategory, debouncedSearch, priceFilter]);

  if (isLoading && !apiDestinations) return <PageSkeleton />;

  const showWarning = error && !isLoading && !apiDestinations;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {showWarning && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center">
          <p className="text-sm text-yellow-800">
            Some content is currently unavailable. Showing cached information.
          </p>
        </div>
      )}

      <HeroSection
        image="destHero.webp"
        title={
          <span>
            Explore Our <span className="text-amber-500">Destinations</span>
          </span>
        }
        subtitle="Discover your next adventure with our curated travel destinations in Dahab and Sinai Peninsula"
        Icon={Compass}
        badge="25+ Destinations"
        primaryCta={{ label: "Start Exploring", href: "#destinations", icon: MapPin }}
        secondaryCta={{ label: "View Map", href: "/map", icon: Compass }}
        stats={[
          { icon: MapPin, text: "25+ Locations" },
          { icon: Users, text: "5000+ Travelers" },
          { icon: Star, text: "4.9/5 Rating" },
        ]}
        priority
        fetchPriority="high"
      />

      <div className="container mx-auto px-4 py-12" id="destinations">
        <Suspense fallback={<SectionDestinationsLoading />}>
          <Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categoryOptions}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
            showPriceFilter={true}
            showCategoryFilter={true}
            showSearchBar={true}
          />
        </Suspense>

        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredDestinations.length}
            </span>{" "}
            destinations
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-yellow-600">
                  {selectedCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        <Suspense fallback={<SectionDestinationsLoading />}>
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.IdPage || destination.id}
                  title={destination.title}
                  subtitle={destination.subtitle}
                  description={destination.description}
                  images={(destination.galleryImages || []).map((img) => img.src)}
                  badge={destination.badge}
                  rating={destination.rating}
                  location={destination.location}
                  price={destination.price}
                  buttonText="View Details"
                  onButtonClick={() => console.log("View:", destination.title)}
                  href={destination.href}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4" aria-hidden>
                <Search className="w-24 h-24 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No destinations found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <PrimaryButton
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceFilter("all");
                }}
              >
                Clear All Filters
              </PrimaryButton>
            </div>
          )}
        </Suspense>
      </div>

      <Suspense fallback={<SectionDestinationsLoading />}>
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
        />
      </Suspense>
    </div>
  );
}

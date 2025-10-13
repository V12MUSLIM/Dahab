"use client";
import { useState, lazy, Suspense } from "react";
import { useDestinations } from "@/hooks/useDestination"
import { Search, MapPin, Compass, Star, Users } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";

// Lazy-load below the fold components
const DestinationCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((module) => ({
    default: module.DestinationCard,
  }))
);
const FilteringTool = lazy(() =>
  import("@/components/customComponents/FilteringTool")
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // Get data from backend via useDestinations hook
  const { 
    destinations, 
    getAllCategories, 
    getDestinationsByCategory,
    isLoading,
    error 
  } = useDestinations();

  // Get all unique categories
  const categories = getAllCategories();

  // Filter destinations based on category, search, and price
  const getFilteredDestinations = () => {
    let filtered =
      selectedCategory === "All"
        ? destinations
        : getDestinationsByCategory(selectedCategory);

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dest) =>
          dest.title.toLowerCase().includes(searchLower) ||
          dest.description.toLowerCase().includes(searchLower) ||
          dest.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((dest) => {
        const price = parseInt(dest.price.replace("$", ""));
        if (priceFilter === "low") return price < 50;
        if (priceFilter === "medium") return price >= 50 && price < 80;
        if (priceFilter === "high") return price >= 80;
        return true;
      });
    }

    return filtered;
  };

  const filteredDestinations = getFilteredDestinations();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading destinations...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">Error loading destinations: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <HeroSection
        imageURL="https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=2070&auto=format&fit=crop"
        title={
          <span>
            Explore Our <span className="text-amber-500">Destinations</span>
          </span>
        }
        subtitle="Discover your next adventure with our curated travel destinations in Dahab and Sinai Peninsula"
        Icon={Compass}
        badge="25+ Destinations"
        description="From serene beaches to majestic mountains, find the perfect spot for your next getaway."
        primaryCta={{
          label: "Start Exploring",
          href: "#destinations",
          icon: MapPin,
        }}
        secondaryCta={{
          label: "View Map",
          href: "/map",
          icon: Compass,
        }}
        stats={[
          { icon: MapPin, text: "25+ Locations" },
          { icon: Users, text: "5000+ Travelers" },
          { icon: Star, text: "4.9/5 Rating" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <Suspense fallback={<div>Loading search & filters...</div>}>
          <FilteringTool
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            searchPlaceholder="Search destinations..."
            showPriceFilter={true}
          />
        </Suspense>

        {/* Results Count */}
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

        {/* Destinations Grid */}
        <Suspense fallback={<div>Loading destinations...</div>}>
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  title={destination.title}
                  subtitle={destination.subtitle}
                  description={destination.description}
                  images={destination.galleryImages.map((img) => img.src)}
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
              <div className="flex justify-center mb-4">
                <Search className="w-24 h-24 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceFilter("all");
                }}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </Suspense>
      </div>

      {/* SocialMediaSection */}
      <Suspense fallback={<div>Loading social...</div>}>
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
        />
      </Suspense>
    </div>
  );
}

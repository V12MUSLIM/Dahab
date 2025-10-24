"use client";
import { lazy, Suspense, useMemo } from "react";
import { Utensils, Phone, Star, Users, Search } from "lucide-react";
import { useState } from "react";

import HeroSection from "@/components/sections/HeroSection";
import { useDine } from "@/hooks/useDine";

const FilteringTool = lazy(() =>
  import("@/components/customComponents/FilteringTool")
);
const ImageCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((module) => ({
    default: module.ImageCard,
  }))
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

const FilterSkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8">
    <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-800 h-80 rounded-2xl mb-4" />
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
  </div>
);

export default function Dine() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const {
    restaurants = [],
    getAllCategories,
    toggleFavorite,
    isFavorite,
    isLoading,
    error,
  } = useDine();

  const categories = useMemo(() => {
    return ["All", ...getAllCategories];
  }, [getAllCategories]);

  const filteredRestaurants = useMemo(() => {
    let filtered =
      selectedCategory === "All"
        ? restaurants
        : restaurants.filter((r) => r.category === selectedCategory);

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title?.toLowerCase().includes(searchLower) ||
          r.description?.toLowerCase().includes(searchLower) ||
          r.location?.toLowerCase().includes(searchLower)
      );
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((r) => {
        const priceValue = r.priceValue || 0;
        if (priceFilter === "low") return priceValue < 50;
        if (priceFilter === "medium")
          return priceValue >= 50 && priceValue < 80;
        if (priceFilter === "high") return priceValue >= 80;
        return true;
      });
    }

    return filtered;
  }, [restaurants, selectedCategory, searchQuery, priceFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <HeroSection
          image="Dine-Images/Hero.webp"
          title="Loading Restaurants..."
          subtitle="Please wait"
          Icon={Utensils}
        />
        <div className="container mx-auto px-4 py-12">
          <FilterSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Utensils className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Restaurants</h2>
          <p className="text-muted-foreground mb-4">
            {error.message || "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <HeroSection
        image="Dine-Images/Hero.webp"
        title={
          <span>
            Discover Amazing <span className="text-amber-500">Dining</span>
          </span>
        }
        subtitle="From beachfront seafood to traditional Bedouin feasts"
        Icon={Utensils}
        badge="30+ Restaurants"
        stats={[
          { icon: Utensils, text: `${restaurants.length}+ Restaurants` },
          { icon: Users, text: "10k+ Diners" },
          { icon: Star, text: "4.8/5 Rating" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<FilterSkeleton />}>
          <FilteringTool
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
            searchPlaceholder="Search restaurants..."
            showPriceFilter={true}
          />
        </Suspense>

        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold">{filteredRestaurants.length}</span>{" "}
            restaurants
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.map((restaurant) => (
                <ImageCard
                  key={restaurant._id || restaurant.id}
                  title={restaurant.title}
                  subtitle={restaurant.subtitle}
                  description={restaurant.description}
                  image={restaurant.image}
                  badge={restaurant.badge}
                  rating={restaurant.rating}
                  location={restaurant.location}
                  price={restaurant.price}
                  buttonText="View Details"
                  href={`/restaurants/${restaurant.IdPage}`}
                  onFavoriteClick={() => toggleFavorite(restaurant._id)}
                  isFavorite={isFavorite(restaurant._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No restaurants found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceFilter("all");
                }}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-96" />}>
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey"
        />
      </Suspense>
    </div>
  );
}

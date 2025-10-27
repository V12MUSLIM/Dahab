"use client";

import { lazy, Suspense, useMemo, useState, useDeferredValue, useEffect } from "react";
import { Utensils, Star, Users, Search } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { useDine } from "@/hooks/useDine";
import { PrimaryButton } from "@/components/customComponents/ButtonVarients";
import Filters from "@/components/customComponents/FilteringTool";

const ImageCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((module) => ({
    default: module.ImageCard,
  }))
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

const FilterSkeleton = () => (
  <div className="animate-pulse space-y-4 mb-8" role="status" aria-label="Loading filters">
    <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-800 h-80 rounded-2xl mb-4" />
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
  </div>
);

const PageSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4" />
      <p className="text-lg text-muted-foreground">Loading restaurants...</p>
    </div>
  </div>
);

export default function Dine() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const {
    allDining,
    getAllCategories,
    toggleFavorite,
    isFavorite,
    isLoading,
  } = useDine();

  const categories = useMemo(() => {
    return ["All", ...getAllCategories];
  }, [getAllCategories]);

  const categoryOptions = useMemo(() => {
    return categories.map(cat => ({
      value: cat,
      label: cat
    }));
  }, [categories]);

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

  const filteredRestaurants = useMemo(() => {
    if (!allDining || allDining.length === 0) return [];

    let filtered =
      selectedCategory === "All"
        ? allDining
        : allDining.filter((r) => r.category === selectedCategory);

    if (debouncedSearch) {
      filtered = filtered.filter(
        (r) =>
          r.title?.toLowerCase().includes(debouncedSearch) ||
          r.description?.toLowerCase().includes(debouncedSearch) ||
          r.location?.toLowerCase().includes(debouncedSearch)
      );
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((r) => {
        const price = normalizePrice(r.price || r.priceValue);
        if (Number.isNaN(price)) return false;
        if (priceFilter === "low") return price < 50;
        if (priceFilter === "medium") return price >= 50 && price < 80;
        if (priceFilter === "high") return price >= 80;
        return true;
      });
    }

    return filtered;
  }, [allDining, selectedCategory, debouncedSearch, priceFilter]);

  if (isLoading) return <PageSkeleton />;

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
          { icon: Utensils, text: `${allDining?.length || 0}+ Places` },
          { icon: Users, text: "10k+ Diners" },
          { icon: Star, text: "4.8/5 Rating" },
        ]}
        priority
        fetchPriority="high"
      />

      <div className="container mx-auto px-4 py-12" id="dining">
        <Suspense fallback={<FilterSkeleton />}>
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
              {filteredRestaurants.length}
            </span>{" "}
            {filteredRestaurants.length === 1 ? "place" : "places"}
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
                  key={restaurant._id || restaurant.id || restaurant.IdPage}
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
                  onFavoriteClick={() => toggleFavorite(restaurant._id || restaurant.id)}
                  isFavorite={isFavorite(restaurant._id || restaurant.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4" aria-hidden>
                <Search className="w-24 h-24 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No places found</h3>
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
// Dine page 
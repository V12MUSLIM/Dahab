"use client";
import { lazy, Suspense } from "react";
import { Utensils, Phone, Star, Users, Search } from "lucide-react";

import HeroSection from "@/components/sections/HeroSection";
import { useDine } from "@/Context/DineContext";
import { useState } from "react";

// Lazy load - Below the fold components
const FilteringTool = lazy(() =>
  import("../components/customComponents/FilteringTool")
);
const ImageCard = lazy(() =>
  import("../components/customComponents/cardTemplates").then((module) => ({
    default: module.ImageCard,
  }))
);

const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);

export default function Dine() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);

  // Get data from context
  const { categories, restaurants } = useDine();

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  // Filter restaurants based on category, search, and price
  const getFilteredRestaurants = () => {
    let filtered =
      selectedCategory === "All"
        ? restaurants
        : restaurants.filter(r => r.category === selectedCategory);

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower) ||
          r.location.toLowerCase().includes(searchLower) ||
          r.subtitle.toLowerCase().includes(searchLower)
      );
    }

    // Apply price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((r) => {
        if (priceFilter === "low") return r.priceValue < 50;
        if (priceFilter === "medium") return r.priceValue >= 50 && r.priceValue < 80;
        if (priceFilter === "high") return r.priceValue >= 80;
        return true;
      });
    }

    return filtered;
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <HeroSection
        imageURL="Dine-Images/Hero.webp"
        title={
          <span>
            Discover Amazing <span className="text-amber-500">Dining</span>
          </span>
        }
        subtitle="From beachfront seafood to traditional Bedouin feasts, explore the best restaurants in Dahab"
        Icon={Utensils}
        badge="30+ Restaurants"
        description="Experience authentic flavors, stunning views, and warm hospitality at Dahab's finest dining establishments."
        primaryCta={{
          label: "Explore Restaurants",
          href: "#restaurants",
          icon: Utensils,
        }}
        secondaryCta={{
          label: "Book a Table",
          href: "/booking",
          icon: Phone,
        }}
        stats={[
          { icon: Utensils, text: "30+ Restaurants" },
          { icon: Users, text: "10k+ Diners" },
          { icon: Star, text: "4.8/5 Rating" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        {/* FilteringTool Component */}
        <Suspense >
          <FilteringTool
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            searchPlaceholder="Search restaurants, cuisine, or dishes..."
            showPriceFilter={true}
          />
        </Suspense>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredRestaurants.length}
            </span>{" "}
            restaurants
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

        {/* Restaurants Grid */}
        <Suspense>
          {filteredRestaurants.length > 0 ? (
            <div
              id="restaurants"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRestaurants.map((restaurant) => (
                <ImageCard
                  key={restaurant.id}
                  title={restaurant.title}
                  subtitle={restaurant.subtitle}
                  description={restaurant.description}
                  image={restaurant.image}
                  badge={restaurant.badge}
                  rating={restaurant.rating}
                  location={restaurant.location}
                  price={restaurant.price}
                  buttonText={restaurant.buttonText}
                  href={restaurant.href}
                  onFavoriteClick={() => toggleFavorite(restaurant.id)}
                  isFavorite={isFavorite(restaurant.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <Search className="w-24 h-24 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                No restaurants found
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

      {/* Social Media Section */}
      <Suspense >
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
        />
      </Suspense>
    </div>
  );
}

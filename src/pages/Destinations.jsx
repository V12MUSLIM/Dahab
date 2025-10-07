import React, { useState } from "react";
import { useDestinations } from "@/context/DestinationsContext";
import { DestinationCard } from "@/components/customComponents/cardTemplates";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import { Compass, Star, Users } from "lucide-react";

export default function DestinationsPage() {
  const { destinations, getAllCategories, getDestinationsByCategory } =
    useDestinations();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // Get all unique categories
  const categories = ["All", ...getAllCategories()];

  // Filter destinations based on category and search
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
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-yellow-500 hover:text-white transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Price Filter */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Price Range:</span>
            {[
              { value: "all", label: "All Prices" },
              { value: "low", label: "Under $50" },
              { value: "medium", label: "$50 - $80" },
              { value: "high", label: "$80+" },
            ].map((filter) => (
              <Badge
                key={filter.value}
                variant={priceFilter === filter.value ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-yellow-500 hover:text-white transition-all"
                onClick={() => setPriceFilter(filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

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
        {filteredDestinations.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DestinationCard
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
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
      </div>
      {/* SocialMediaSection */}
      <SocialMediaSection
        badge="Conect"
        header="Stay Connected"
        description=" Follow our journey and stay updated with the latest from Dahab"
      />
    </div>
  );
}

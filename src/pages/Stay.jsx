// pages/Stay.jsx
import { useState, lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Hotel,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Waves,
  Mountain,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Filters from "@/components/customComponents/FilteringTool";
import { StayCard } from "@/components/customComponents/cardTemplates";
import ContactSection from "@/components/sections/ContactSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import { useStay } from "@/hooks/useStay";
import DahabLoader from "@/components/Loading";

// Lazy load sections
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const GallerySection = lazy(() =>
  import("@/components/sections/GallerySection")
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection")
);
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));

// Lazy load buttons
const PrimaryButton = lazy(() =>
  import("@/components/customComponents/ButtonVarients").then((module) => ({
    default: module.PrimaryButton,
  }))
);

const SecondaryButton = lazy(() =>
  import("@/components/customComponents/ButtonVarients").then((module) => ({
    default: module.SecondaryButton,
  }))
);

// Loading skeleton
const SectionSkeleton = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
);

const categories = [
  { value: "all", label: "All Types" },
  { value: "resort", label: "Resorts" },
  { value: "hotel", label: "Hotels" },
  { value: "boutique", label: "Boutique" },
];

// Helper function to get amenity names from stay
const getAmenityNames = (stay) => {
  const amenities = [];
  if (stay.amenities) {
    Object.values(stay.amenities).forEach((categoryAmenities) => {
      if (Array.isArray(categoryAmenities)) {
        categoryAmenities.slice(0, 2).forEach((amenity) => {
          // Map common amenities to icon names
          if (amenity.toLowerCase().includes("wifi")) amenities.push("Wifi");
          else if (
            amenity.toLowerCase().includes("coffee") ||
            amenity.toLowerCase().includes("bar")
          )
            amenities.push("Coffee");
          else if (
            amenity.toLowerCase().includes("restaurant") ||
            amenity.toLowerCase().includes("dining")
          )
            amenities.push("Utensils");
          else if (
            amenity.toLowerCase().includes("parking") ||
            amenity.toLowerCase().includes("car")
          )
            amenities.push("Car");
          else if (
            amenity.toLowerCase().includes("beach") ||
            amenity.toLowerCase().includes("sea")
          )
            amenities.push("Waves");
          else if (amenity.toLowerCase().includes("mountain"))
            amenities.push("Mountain");
        });
      }
    });
  }
  return [...new Set(amenities)].slice(0, 5); // Remove duplicates and limit to 5
};

export default function StayPage() {
  const { data: stays, isLoading, error } = useStay();
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Get all stays from context
  const accommodations = useMemo(() => {
    if (!stays) return [];
    return stays.map((stay) => ({
      id: stay.id,
      name: stay.name,
      type: stay.subtitle,
      category: stay.type,
      location: stay.location,
      rating: parseFloat(stay.rating),
      reviews: stay.totalReviews,
      pricePerNight: stay.pricePerNight,
      images: stay.galleryImages,
      amenities: getAmenityNames(stay),
      description: stay.description,
      popular: stay.badge === "Popular" || stay.badge === "Top Rated",
      features: stay.features,
      href: `/stay/${stay.IdPage}`,
    }));
  }, [stays]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        {" "}
        <DahabLoader />;
      </div>
    );
  }
  if (error) {
    return <div>Error loading accommodations: {error.message} </div>;
  }
  // Filter accommodations
  const filteredAccommodations = accommodations.filter((acc) => {
    const matchesSearch = acc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || acc.category === selectedCategory;

    let matchesPrice = true;
    if (priceFilter === "low") {
      matchesPrice = acc.pricePerNight < 50;
    } else if (priceFilter === "medium") {
      matchesPrice = acc.pricePerNight >= 50 && acc.pricePerNight <= 80;
    } else if (priceFilter === "high") {
      matchesPrice = acc.pricePerNight > 80;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection
          image="stay.webp"
          imageMd="stay.webp"
          imageSm="stay-small.webp"
          title="Find Your Perfect"
          highlight="Stay in Dahab"
          subtitle="From luxury resorts to cozy boutique hotels, discover the ideal accommodation for your Red Sea adventure"
          Icon={Hotel}
          badge="Accommodation"
          primaryCta={{
            label: "Browse Hotels",
            href: "#accommodations",
            icon: "ArrowRight",
          }}
          secondaryCta={{
            label: "Contact Us",
            href: "#contact",
          }}
          PrimaryButton={PrimaryButton}
          SecondaryButton={SecondaryButton}
          stats={[
            { icon: Hotel, text: `${accommodations.length}+ Properties` },
            { icon: Star, text: "4.7 Avg Rating" },
            { icon: CheckCircle, text: "Best Prices" },
          ]}
        />
      </Suspense>

      {/* Featured Stays with StayCard - Top 3 with carousel */}
      <section className="py-16 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              <Hotel className="w-4 h-4 mr-2" />
              Featured Properties
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Top Picks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best accommodations Dahab has to offer with our
              handpicked selection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.slice(0, 3).map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StayCard
                  name={hotel.name}
                  type={hotel.type}
                  location={hotel.location}
                  description={hotel.description}
                  images={hotel.images}
                  popular={hotel.popular}
                  rating={hotel.rating}
                  reviews={hotel.reviews}
                  pricePerNight={hotel.pricePerNight}
                  amenities={hotel.amenities}
                  features={hotel.features}
                  buttonText="View Details"
                  href={hotel.href}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section
        id="accommodations"
        className="py-16 px-4 bg-muted/30 dark:bg-muted/20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              <Hotel className="w-4 h-4 mr-2" />
              All Properties
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore All Accommodations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of hotels, resorts, and boutique stays that
              suit your style and budget
            </p>
          </motion.div>

          {/* FilteringTool Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              priceFilter={priceFilter}
              onPriceChange={setPriceFilter}
              showPriceFilter={true}
              showCategoryFilter={true}
              showSearchBar={true}
            />
          </motion.div>

          {/* Results Count */}
          <motion.div
            className="mt-8 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">
              Showing {filteredAccommodations.length} of {accommodations.length}{" "}
              accommodations
            </p>
          </motion.div>

          {/* Accommodations Grid - NOW USING StayCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StayCard
                  name={hotel.name}
                  type={hotel.type}
                  location={hotel.location}
                  description={hotel.description}
                  images={hotel.images}
                  popular={hotel.popular}
                  rating={hotel.rating}
                  reviews={hotel.reviews}
                  pricePerNight={hotel.pricePerNight}
                  amenities={hotel.amenities}
                  features={hotel.features}
                  buttonText="View Details"
                  href={hotel.href}
                />
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredAccommodations.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Hotel className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                No accommodations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Book With Us Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>

      {/* Gallery Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <GallerySection
          badge="Gallery"
          header="Explore Dahab Accommodations"
          paragraph="Browse through stunning photos of our featured properties"
          images={[
            { url: "/images/gallery-1.webp", caption: "Luxury Beachfront" },
            { url: "/images/gallery-2.webp", caption: "Cozy Boutique Rooms" },
            { url: "/images/gallery-3.webp", caption: "Pool & Sea Views" },
            { url: "/images/gallery-4.webp", caption: "Desert Oasis" },
            { url: "/images/gallery-5.webp", caption: "Sunset Dining" },
          ]}
        />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      {/*Social Media Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our journey and stay updated with the latest from Dahab"
          id="contact"
        />
      </Suspense>
    </div>
  );
}

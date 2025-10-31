// pages/Stay.jsx
import { useState, lazy, Suspense } from "react";
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

// Updated accommodation data - all items now have images array and href
const accommodations = [
  {
    id: 1,
    name: "Swiss Inn Resort Dahab",
    type: "Luxury Resort",
    category: "resort",
    location: "Lighthouse Beach",
    rating: 4.8,
    reviews: 342,
    pricePerNight: 138,
    images: [
      "https://images.trvl-media.com/lodging/2000000/1160000/1160000/1159956/8df09f6f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/117899327.jpg?k=3d3275fd064810dcefad18bf8a334c069d167a7ab5fb7e6efe34a58586d72fd9&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643830382.jpg?k=0bd267adbac803b591c00fe08bedb970c992b0a8b3b077f1457fb605c4294ced&o=&hp=1",
    ],
    amenities: ["Wifi", "Coffee", "Utensils", "Car", "Waves"],
    description:
      "Luxury beachfront resort with direct beach access, multiple dining options, and family-friendly facilities.",
    popular: true,
    features: [
      "Private Beach",
      "Water Sports",
      "Kids Pool",
      "Spa & Wellness",
      "Free Parking",
    ],
    href: "/stay/swiss-inn",
  },
  {
    id: 2,
    name: "Tropitel Dahab Oasis",
    type: "Resort & Dive Center",
    category: "resort",
    location: "Near Blue Hole",
    rating: 4.6,
    reviews: 278,
    pricePerNight: 94,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/117899327.jpg?k=3d3275fd064810dcefad18bf8a334c069d167a7ab5fb7e6efe34a58586d72fd9&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643830382.jpg?k=0bd267adbac803b591c00fe08bedb970c992b0a8b3b077f1457fb605c4294ced&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/517391655.jpg?k=6fef52b18def2f5488893c9c2814be1e1819f6d25ea5872f0aa7bcae465a1b5d&o=&hp=1",
    ],
    amenities: ["Wifi", "Utensils", "Waves", "Car"],
    description:
      "Perfect for diving enthusiasts with direct reef access and professional dive center on-site.",
    popular: false,
    features: [
      "Dive Center",
      "Coral Reef Access",
      "Free Parking",
      "Restaurant",
      "Beach Bar",
    ],
    href: "/stay/tropitel",
  },
  {
    id: 3,
    name: "Dahab Paradise",
    type: "Beachfront Resort",
    category: "resort",
    location: "Laguna Beach",
    rating: 4.9,
    reviews: 412,
    pricePerNight: 108,
    images: [
      "https://images.trvl-media.com/lodging/22000000/21580000/21574400/21574375/db301f11.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/f2/f0/98/caption.jpg?w=900&h=500&s=1",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/641041752.jpg?k=938bb97b637769064436891dc717d16c295f42467ce18c7e0dd6af8f1253c142&o=",
    ],
    amenities: ["Wifi", "Coffee", "Utensils", "Waves", "Car"],
    description:
      "Serene beachfront property with pristine Red Sea views and premium amenities.",
    popular: true,
    features: [
      "Beachfront Location",
      "Red Sea Views",
      "Restaurant & Bar",
      "Free WiFi",
      "Airport Shuttle",
    ],
    href: "/stay/dahab-paradise",
  },
  {
    id: 4,
    name: "Sheikh Ali Resort",
    type: "Boutique Hotel",
    category: "boutique",
    location: "Dahab City Center",
    rating: 4.5,
    reviews: 156,
    pricePerNight: 45,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643830382.jpg?k=0bd267adbac803b591c00fe08bedb970c992b0a8b3b077f1457fb605c4294ced&o=&hp=1",
    ],
    amenities: ["Wifi", "Coffee", "Utensils"],
    description:
      "Charming boutique hotel in the heart of Dahab with apartment-style rooms and central location.",
    popular: false,
    features: [
      "Kitchenettes",
      "Central Location",
      "Pool & Terrace",
      "Walking Distance to Beach",
      "Budget Friendly",
    ],
    href: "/stay/sheikh-ali",
  },
  {
    id: 5,
    name: "Bedouin Moon Hotel",
    type: "Sea View Hotel",
    category: "hotel",
    location: "Mashraba",
    rating: 4.7,
    reviews: 189,
    pricePerNight: 67,
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/517391655.jpg?k=6fef52b18def2f5488893c9c2814be1e1819f6d25ea5872f0aa7bcae465a1b5d&o=&hp=1",
    ],
    amenities: ["Wifi", "Utensils", "Waves", "Mountain"],
    description:
      "Stunning views between mountains and sea with direct beach access and excellent diving facilities.",
    popular: false,
    features: [
      "Mountain & Sea Views",
      "Private Beach",
      "Diving Center",
      "Panoramic Pool",
      "Coral Reef Snorkeling",
    ],
    href: "/stay/bedouin-moon",
  },
  {
    id: 6,
    name: "Acacia Dahab Hotel",
    type: "Mid-Range Hotel",
    category: "hotel",
    location: "Lighthouse",
    rating: 4.4,
    reviews: 203,
    pricePerNight: 52,
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/f2/f0/98/caption.jpg?w=900&h=500&s=1",
    ],
    amenities: ["Wifi", "Coffee", "Utensils"],
    description:
      "Relaxed atmosphere with poolside bar, perfect for socializing and close to beach and nightlife.",
    popular: false,
    features: [
      "Poolside Bar",
      "Social Atmosphere",
      "Close to Beach",
      "Air Conditioned Rooms",
      "Balconies",
    ],
    href: "/stay/acacia",
  },
  {
    id: 7,
    name: "Coral Coast Hotel",
    type: "Budget Hotel",
    category: "hotel",
    location: "Dahab City",
    rating: 4.3,
    reviews: 124,
    pricePerNight: 35,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQ21QJJtHkcfGLFBiFLtFGV81e9qxV5wGOg&s",
    ],
    amenities: ["Wifi", "Coffee"],
    description:
      "Affordable accommodation with friendly staff and convenient location near the beach.",
    popular: false,
    features: [
      "Budget Friendly",
      "Free WiFi",
      "Rooftop Terrace",
      "Near Beach",
      "Breakfast Included",
    ],
    href: "/stay/coral-coast",
  },
  {
    id: 8,
    name: "Blue Beach Club",
    type: "Boutique Resort",
    category: "boutique",
    location: "Blue Lagoon",
    rating: 4.6,
    reviews: 198,
    pricePerNight: 78,
    images: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/641041752.jpg?k=938bb97b637769064436891dc717d16c295f42467ce18c7e0dd6af8f1253c142&o=",
    ],
    amenities: ["Wifi", "Coffee", "Utensils", "Waves"],
    description:
      "Stylish boutique resort with modern design, beachfront access, and personalized service.",
    popular: false,
    features: [
      "Beachfront",
      "Modern Design",
      "Restaurant",
      "Beach Bar",
      "Yoga Classes",
    ],
    href: "/stay/blue-beach",
  },
];

const categories = [
  { value: "all", label: "All Types" },
  { value: "resort", label: "Resorts" },
  { value: "hotel", label: "Hotels" },
  { value: "boutique", label: "Boutique" },
];

const amenityIcons = {
  Wifi,
  Coffee,
  Utensils,
  Car,
  Waves,
  Mountain,
};

export default function StayPage() {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

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
            { icon: Hotel, text: "50+ Properties" },
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
                  buttonText="Book Now"
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
                  buttonText="Book Now"
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
        />
      </Suspense>
    </div>
  );
}

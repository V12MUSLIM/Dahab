// pages/Stay.jsx
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Hotel,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Waves,
  Mountain,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Heart,
  Check,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Filters from "@/components/customComponents/FilteringTool";

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

// Accommodation data
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
    image: "https://images.trvl-media.com/lodging/2000000/1160000/1160000/1159956/8df09f6f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
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
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/117899327.jpg?k=3d3275fd064810dcefad18bf8a334c069d167a7ab5fb7e6efe34a58586d72fd9&o=&hp=1",
    amenities: ["Wifi", "Utensils", "Waves", "Car"],
    description:
      "Perfect for diving enthusiasts with direct reef access and professional dive center on-site.",
    features: [
      "Dive Center",
      "Coral Reef Access",
      "Free Parking",
      "Restaurant",
      "Beach Bar",
    ],
  },
  {
    id: 3,
    name: "Sheikh Ali Resort",
    type: "Boutique Hotel",
    category: "boutique",
    location: "Dahab City Center",
    rating: 4.5,
    reviews: 156,
    pricePerNight: 45,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643830382.jpg?k=0bd267adbac803b591c00fe08bedb970c992b0a8b3b077f1457fb605c4294ced&o=&hp=1",
    amenities: ["Wifi", "Coffee", "Utensils"],
    description:
      "Charming boutique hotel in the heart of Dahab with apartment-style rooms and central location.",
    features: [
      "Kitchenettes",
      "Central Location",
      "Pool & Terrace",
      "Walking Distance to Beach",
      "Budget Friendly",
    ],
  },
  {
    id: 4,
    name: "Bedouin Moon Hotel",
    type: "Sea View Hotel",
    category: "hotel",
    location: "Mashraba",
    rating: 4.7,
    reviews: 189,
    pricePerNight: 67,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/517391655.jpg?k=6fef52b18def2f5488893c9c2814be1e1819f6d25ea5872f0aa7bcae465a1b5d&o=&hp=1",
    amenities: ["Wifi", "Utensils", "Waves", "Mountain"],
    description:
      "Stunning views between mountains and sea with direct beach access and excellent diving facilities.",
    features: [
      "Mountain & Sea Views",
      "Private Beach",
      "Diving Center",
      "Panoramic Pool",
      "Coral Reef Snorkeling",
    ],
  },
  {
    id: 5,
    name: "Acacia Dahab Hotel",
    type: "Mid-Range Hotel",
    category: "hotel",
    location: "Lighthouse",
    rating: 4.4,
    reviews: 203,
    pricePerNight: 52,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/f2/f0/98/caption.jpg?w=900&h=500&s=1",
    amenities: ["Wifi", "Coffee", "Utensils"],
    description:
      "Relaxed atmosphere with poolside bar, perfect for socializing and close to beach and nightlife.",
    features: [
      "Poolside Bar",
      "Social Atmosphere",
      "Close to Beach",
      "Air Conditioned Rooms",
      "Balconies",
    ],
  },
  {
    id: 6,
    name: "Dahab Paradise",
    type: "Beachfront Resort",
    category: "resort",
    location: "Laguna Beach",
    rating: 4.9,
    reviews: 412,
    pricePerNight: 108,
    image: "https://images.trvl-media.com/lodging/22000000/21580000/21574400/21574375/db301f11.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQ21QJJtHkcfGLFBiFLtFGV81e9qxV5wGOg&s",
    amenities: ["Wifi", "Coffee"],
    description:
      "Affordable accommodation with friendly staff and convenient location near the beach.",
    features: [
      "Budget Friendly",
      "Free WiFi",
      "Rooftop Terrace",
      "Near Beach",
      "Breakfast Included",
    ],
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
    image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/641041752.jpg?k=938bb97b637769064436891dc717d16c295f42467ce18c7e0dd6af8f1253c142&o=",
    amenities: ["Wifi", "Coffee", "Utensils", "Waves"],
    description:
      "Stylish boutique resort with modern design, beachfront access, and personalized service.",
    features: [
      "Beachfront",
      "Modern Design",
      "Restaurant",
      "Beach Bar",
      "Yoga Classes",
    ],
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
              Where to Stay
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Accommodations
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

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    hotel.popular
                      ? "border-yellow-600 dark:border-yellow-700 shadow-yellow-600/20 dark:shadow-yellow-700/20"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Popular Badge */}
                    {hotel.popular && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white border-0">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(hotel.id)}
                      className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:scale-110 transition-transform"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(hotel.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </button>
                    {/* Type Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-yellow-600/90 dark:bg-yellow-700/90 text-white border-0">
                        {hotel.type}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-bold group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                        {hotel.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                      {hotel.location}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-600 text-yellow-600 dark:fill-yellow-500 dark:text-yellow-500" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="mb-4">
                      {hotel.description}
                    </CardDescription>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.map((amenity, idx) => {
                        const Icon = amenityIcons[amenity];
                        return (
                          <div
                            key={idx}
                            className="p-2 bg-muted rounded-lg"
                            title={amenity}
                          >
                            {Icon && (
                              <Icon className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {hotel.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                            ${hotel.pricePerNight}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /night
                          </span>
                        </div>
                      </div>
                      <Suspense fallback={<div className="h-9 w-24 bg-muted animate-pulse rounded" />}>
                        {hotel.popular ? (
                          <PrimaryButton size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Now
                          </PrimaryButton>
                        ) : (
                          <SecondaryButton size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Now
                          </SecondaryButton>
                        )}
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book With Confidence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Best Price Guarantee",
                description:
                  "We offer the most competitive rates for all accommodations in Dahab",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description:
                  "Our team is always available to assist you before, during, and after your stay",
              },
              {
                icon: Check,
                title: "Verified Reviews",
                description:
                  "All reviews are from real guests who have stayed at our properties",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 dark:from-yellow-600/20 dark:to-yellow-700/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Need Help Finding the Perfect Stay?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is ready to help you find the ideal accommodation for
              your Dahab adventure
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Suspense fallback={<div className="h-12 w-32 bg-muted animate-pulse rounded" />}>
                <PrimaryButton size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </PrimaryButton>
                <SecondaryButton size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </SecondaryButton>
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

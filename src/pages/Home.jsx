import HeroSection from "../components/sections/HeroSection";
import GallerySection from "../components/sections/GallerySection";
import PackageDealsSection from "../components/sections/PackageDealsSection";
import FeaturedDestinationsSection from "../components/sections/FeaturedDestinationsSection";
import ActivitiesSection from "../components/sections/ActivitiesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
import ContactSection from "../components/sections/ContactSection";

export default function Home() {
  const packages = [
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
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <GallerySection 
        badge="Gallery"
        header=" Discover Dahab's Beauty "
        paragraph="From pristine beaches to vibrant coral reefs, experience the magic
              of Egypt's coastal gem "
      />
      <PackageDealsSection
        packages={packages}
        badge="Special Offers"
        header="Exclusive Packages Deals"
        description="   Choose from our carefully curated packages for an unforgettable
            Dahab experience"
      />
      <FeaturedDestinationsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}

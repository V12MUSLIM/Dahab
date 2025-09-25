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
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <GallerySection />
      <PackageDealsSection />
      <FeaturedDestinationsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}

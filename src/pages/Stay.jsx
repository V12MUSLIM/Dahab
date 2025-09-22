import { useState, useEffect } from "react";
import {
  ImageCard,
  StatsCard,
  TestimonialCard,
} from "@/components/cardTemplates";
import { MapPin, Star, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Stay() {
  const [stayData, setStayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/stay")
      .then((res) => res.json())
      .then((data) => {
        setStayData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-200 dark:border-yellow-800 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Discovering Amazing Stays
            </h2>
            <p className="text-muted-foreground">
              Finding the perfect accommodations for you...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            {stayData?.message || "Discover Your Perfect Stay"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore handpicked accommodations that offer comfort, authenticity,
            and unforgettable experiences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Stats Section */}
        {stayData?.accommodations && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <StatsCard
              title="Available Stays"
              value={stayData.accommodations.length.toString()}
              icon={MapPin}
              description="Carefully selected accommodations"
              className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            />
            <StatsCard
              title="Average Rating"
              value="4.8"
              icon={Star}
              trend="+0.2 this month"
              description="Based on guest reviews"
              className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            />
            <StatsCard
              title="Happy Guests"
              value="2.5K+"
              icon={Users}
              trend="+15% this year"
              description="Satisfied travelers"
              className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            />
          </div>
        )}

        {/* Accommodations Grid */}
        {stayData?.accommodations && stayData.accommodations.length > 0 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Accommodations
              </h2>
              <p className="text-muted-foreground">
                Discover unique places to stay that match your travel style
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stayData.accommodations.map((acc, index) => (
                <ImageCard
                  key={acc.id}
                  title={acc.name}
                  subtitle="Featured Stay"
                  description={acc.description}
                  image={acc.image} // cycles through 1 → 4
                  badge={
                    index === 0
                      ? "Best Seller"
                      : index === 1
                      ? "New"
                      : "Popular"
                  }
                  rating={(4.5 + Math.random() * 0.4).toFixed(1)}
                  location="Dahab, Egypt"
                  price={acc.price}
                  buttonText="View Details"
                  onButtonClick={() => console.log(`Viewing ${acc.name}`)}
                  className="hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                No Accommodations Available
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're currently updating our listings. Check back soon for
                amazing stay options in your area.
              </p>
            </div>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={() => window.location.reload()}
            >
              Refresh Listings
            </Button>
          </div>
        )}

        {/* Testimonials Section */}
        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              What Our Guests Say
            </h2>
            <p className="text-muted-foreground">
              Real experiences from travelers who found their perfect stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              name="Sarah Mitchell"
              location="London, UK"
              rating={5}
              comment="The accommodation was perfect! Beautiful location, exceptional service, and incredible value for money. Will definitely be back!"
              avatar="https://images.unsplash.com/photo-1494790108755-2616b612b639?w=150&h=150&fit=crop&crop=face"
              className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            />

            <TestimonialCard
              name="Ahmed Al-Rashid"
              location="Dubai, UAE"
              rating={5}
              comment="Outstanding experience from booking to checkout. The host was incredibly welcoming and the place exceeded all expectations."
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              className="hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-12 border border-yellow-200 dark:border-yellow-800/30">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered amazing
            accommodations through our platform. Your next adventure is just a
            booking away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Browse All Stays
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8"
            >
              <Star className="w-5 h-5 mr-2" />
              View Top Rated
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Stay Finder. Crafted with care for travelers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}

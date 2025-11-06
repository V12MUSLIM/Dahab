"use client";
import {
  lazy,
  Suspense,
  useState,
  useMemo,
  useDeferredValue,
  useEffect,
} from "react";
import { Compass, Search } from "lucide-react";
import Filters from "@/components/customComponents/FilteringTool";
import { PrimaryButton } from "@/components/customComponents/ButtonVarients";
import { useExperiences } from "@/hooks/useExperience";
import DahabLoader from "@/components/Loading";

const ExperienceCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((module) => ({
    default: module.ExperienceCard,
  }))
);
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection")
);
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-800 h-72 rounded-2xl mb-4" />
    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
  </div>
);

const SectionSkeleton = () => (
  <div className="animate-pulse space-y-4 w-full">
    <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default function Experiences() {
  const {
    experiences: apiExperiences,
    getAllCategories,
    getExperiencesByCategory,
    error,
  } = useExperiences();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const experiencesByCategory = useMemo(() => {
    return apiExperiences || [];
  }, [apiExperiences]);

  const allExperiences = useMemo(() => {
    return experiencesByCategory.flatMap((cat) =>
      (cat.experiences || []).map((exp) => ({
        ...exp,
        category: cat.category,
      }))
    );
  }, [experiencesByCategory]);

  const categories = useMemo(() => {
    if (typeof getAllCategories === "function") {
      const apiCats = getAllCategories();
      if (Array.isArray(apiCats) && apiCats.length > 0) {
        return ["All", ...apiCats];
      }
    }
    return ["All", ...experiencesByCategory.map((cat) => cat.category)];
  }, [experiencesByCategory, getAllCategories]);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat,
      label: cat,
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

  const filteredExperiences = useMemo(() => {
    let filtered = allExperiences;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((exp) => exp.category === selectedCategory);
    }

    if (debouncedSearch) {
      filtered = filtered.filter(
        (exp) =>
          exp.title?.toLowerCase().includes(debouncedSearch) ||
          exp.description?.toLowerCase().includes(debouncedSearch) ||
          exp.location?.toLowerCase().includes(debouncedSearch) ||
          exp.difficulty?.toLowerCase().includes(debouncedSearch)
      );
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((exp) => {
        const price = normalizePrice(exp.price);
        if (Number.isNaN(price)) return false;
        if (priceFilter === "low") return price < 50;
        if (priceFilter === "medium") return price >= 50 && price < 80;
        if (priceFilter === "high") return price >= 80;
        return true;
      });
    }

    return filtered;
  }, [allExperiences, selectedCategory, debouncedSearch, priceFilter]);

  if (DahabLoader && !apiExperiences) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <DahabLoader loadingMessage="Loading Experiences" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Suspense
        fallback={
          <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        }
      >
        <HeroSection
          image="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600"
          title="Unforgettable Experiences"
          subtitle="Adventure Awaits in Dahab"
          Icon={Compass}
          badge="Explore"
          stats={[
            { icon: Compass, text: "50+ Activities" },
            { icon: Compass, text: "Expert Guides" },
            { icon: Compass, text: "All Skill Levels" },
          ]}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-20 bg-gray-200 dark:bg-gray-800 animate-pulse mx-4 my-8 rounded-lg" />
        }
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
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
        </div>
      </Suspense>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredExperiences.length}
              </span>{" "}
              {filteredExperiences.length === 1 ? "experience" : "experiences"}
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

          <div className="space-y-16">
            {experiencesByCategory.map((categorySection) => {
              const categoryExperiences = (
                categorySection.experiences || []
              ).filter((exp) => {
                let passes = true;

                if (
                  selectedCategory !== "All" &&
                  categorySection.category !== selectedCategory
                ) {
                  passes = false;
                }

                if (passes && debouncedSearch) {
                  passes =
                    exp.title?.toLowerCase().includes(debouncedSearch) ||
                    exp.description?.toLowerCase().includes(debouncedSearch) ||
                    exp.location?.toLowerCase().includes(debouncedSearch) ||
                    exp.difficulty?.toLowerCase().includes(debouncedSearch);
                }

                if (passes && priceFilter !== "all") {
                  const price = normalizePrice(exp.price);
                  if (Number.isNaN(price)) {
                    passes = false;
                  } else {
                    if (priceFilter === "low") passes = price < 50;
                    if (priceFilter === "medium")
                      passes = price >= 50 && price < 80;
                    if (priceFilter === "high") passes = price >= 80;
                  }
                }

                return passes;
              });

              if (categoryExperiences.length === 0) return null;

              return (
                <section key={categorySection.category}>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block pb-3 border-b-4 border-yellow-500">
                      {categorySection.category}
                    </h2>
                  </div>

                  <Suspense fallback={<SectionSkeleton />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryExperiences.map((experience) => (
                        <ExperienceCard
                          key={experience.id}
                          title={experience.title}
                          subtitle={experience.subtitle}
                          description={experience.description}
                          images={experience.images}
                          badge={experience.badge}
                          rating={experience.rating}
                          location={experience.location}
                          duration={experience.duration}
                          groupSize={experience.groupSize}
                          difficulty={experience.difficulty}
                          price={experience.price}
                          href={experience.href}
                          buttonText="Book Now"
                          onButtonClick={() =>
                            console.log("Booking:", experience.title)
                          }
                        />
                      ))}
                    </div>
                  </Suspense>
                </section>
              );
            })}

            {filteredExperiences.length === 0 && (
              <div className="text-center py-20">
                <div className="flex justify-center mb-4" aria-hidden>
                  <Search className="w-24 h-24 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  No experiences found
                </h3>
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
          </div>
        </div>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

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

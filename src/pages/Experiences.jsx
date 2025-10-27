"use client";
import { lazy, Suspense } from "react";
import { Compass } from "lucide-react";

// Lazy loaded components
const ExperienceCard = lazy(() =>
  import("@/components/customComponents/cardTemplates").then((module) => ({
    default: module.ExperienceCard,
  }))
);
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const FilteringTool = lazy(() =>
  import("@/components/customComponents/FilteringTool")
);
const SocialMediaSection = lazy(() =>
  import("@/components/sections/SocialMediaSection")
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection")
);
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));

// Skeleton components
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

// Experiences data
const experiencesByCategory = [
  {
    category: "Water Adventures",
    experiences: [
      {
        id: "w1",
        IdPage: "scuba-diving",
        title: "Scuba Diving",
        subtitle: "Water Adventure",
        description:
          "Explore the Red Sea's vibrant coral reefs and rich underwater paradise with our certified guides.",
        images: [
          "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt",
        ],
        badge: "Popular",
        rating: "4.9",
        location: "Dahab Red Sea",
        duration: "3-4 hours",
        groupSize: "4-6 people",
        difficulty: "Beginner",
        price: "$75",
        href: "/experiences/scuba-diving",
      },
      {
        id: "w2",
        IdPage: "snorkeling-tours",
        title: "Snorkeling Tours",
        subtitle: "Water Adventure",
        description:
          "Discover colorful marine life just below the surface in Dahab's most beautiful snorkeling spots.",
        images: [
          "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        badge: "Family Friendly",
        rating: "4.8",
        location: "Dahab Coast",
        duration: "2-3 hours",
        groupSize: "6-10 people",
        difficulty: "Easy",
        price: "$45",
        href: "/experiences/snorkeling-tours",
      },
      {
        id: "w3",
        IdPage: "windsurfing-kitesurfing",
        title: "Windsurfing & Kitesurfing",
        subtitle: "Water Adventure",
        description:
          "Ride the waves and feel the thrill of the wind at the famous Dahab Lagoon.",
        images: [
          "https://www.iksurfmag.com/wp-content/uploads/2023/04/DSC6405.jpg.jpg",
        ],
        badge: "Adrenaline",
        rating: "4.9",
        location: "Dahab Lagoon",
        duration: "2-4 hours",
        groupSize: "2-4 people",
        difficulty: "Intermediate",
        price: "$85",
        href: "/experiences/windsurfing-kitesurfing",
      },
    ],
  },
  {
    category: "Desert Adventures",
    experiences: [
      {
        id: "d1",
        IdPage: "desert-safari",
        title: "Desert Safari",
        subtitle: "Desert Adventure",
        description:
          "Experience the thrill of a quad bike ride across the Sinai desert and enjoy Bedouin hospitality.",
        images: [
          "https://desert-safari-egypte.com/wp-content/uploads/2022/11/home-gallery-01.jpg",
        ],
        badge: "Adventure",
        rating: "4.9",
        location: "Sinai Desert",
        duration: "5-6 hours",
        groupSize: "6-12 people",
        difficulty: "Moderate",
        price: "$95",
        href: "/experiences/desert-safari",
      },
      {
        id: "d2",
        IdPage: "bedouin-dinner",
        title: "Bedouin Dinner Under the Stars",
        subtitle: "Cultural Experience",
        description:
          "A magical evening with authentic Bedouin cuisine, traditional music, and stargazing.",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2huN2dfdeQXp7pYTXEf4RpuOqQi2-jYsQWg&s",
        ],
        badge: "Cultural",
        rating: "5.0",
        location: "Bedouin Camp",
        duration: "3-4 hours",
        groupSize: "8-20 people",
        difficulty: "Easy",
        price: "$65",
        href: "/experiences/bedouin-dinner",
      },
      {
        id: "d3",
        IdPage: "rock-climbing-hiking",
        title: "Rock Climbing & Hiking",
        subtitle: "Adventure Sport",
        description:
          "Challenge yourself on the stunning rock faces and hiking trails of the Sinai mountains.",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurCLHN9L4X1TIXGtAxDF8JwJzhS5rjgC0WQ&s",
        ],
        badge: "Adventure",
        rating: "4.8",
        location: "Sinai Mountains",
        duration: "4-6 hours",
        groupSize: "4-8 people",
        difficulty: "Advanced",
        price: "$105",
        href: "/experiences/rock-climbing-hiking",
      },
    ],
  },
  {
    category: "Relaxation & Wellness",
    experiences: [
      {
        id: "r1",
        IdPage: "sunrise-yoga",
        title: "Sunrise Yoga Sessions",
        subtitle: "Wellness",
        description:
          "Start your day with a rejuvenating yoga session on the beach, facing the beautiful sunrise.",
        images: [
          "https://st3.depositphotos.com/1035122/34939/i/450/depositphotos_349395388-stock-photo-old-man-with-grey-beard.jpg",
        ],
        badge: "Wellness",
        rating: "4.9",
        location: "Dahab Beach",
        duration: "1-2 hours",
        groupSize: "4-12 people",
        difficulty: "Easy",
        price: "$35",
        href: "/experiences/sunrise-yoga",
      },
      {
        id: "r2",
        IdPage: "meditation-spa",
        title: "Meditation & Spa Treatments",
        subtitle: "Wellness",
        description:
          "Find your inner peace with guided meditation and indulge in our relaxing spa packages.",
        images: [
          "https://media.istockphoto.com/id/1215733691/photo/calm-man-meditating-in-sunny-summer-day.jpg?s=612x612&w=0&k=20&c=DVpQcX0Pa1mmz97sr31C80eju-5v3BVkCdirR0_T_0c=",
        ],
        badge: "Relaxation",
        rating: "5.0",
        location: "Wellness Center",
        duration: "2-3 hours",
        groupSize: "2-6 people",
        difficulty: "Easy",
        price: "$85",
        href: "/experiences/meditation-spa",
      },
    ],
  },
];

export default function Experiences() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <Suspense
        fallback={
          <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        }
      >
        <HeroSection
          imageURL="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600"
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

      {/* Filtering Tool */}
      <Suspense
        fallback={
          <div className="h-20 bg-gray-200 dark:bg-gray-800 animate-pulse mx-4 my-8 rounded-lg" />
        }
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <FilteringTool
            categories={[
              "All",
              ...experiencesByCategory.map((cat) => cat.category),
            ]}
            onCategoryChange={(category) => console.log(category)}
            onSearchChange={(search) => console.log(search)}
          />
        </div>
      </Suspense>

      {/* Experiences by Category */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {experiencesByCategory.map((categorySection) => (
            <section key={categorySection.category}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-yellow-500 pl-4">
                {categorySection.category}
              </h2>
              <Suspense fallback={<SectionSkeleton />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorySection.experiences.map((experience) => (
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
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      {/* Social Media Section */}
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

"use client";

import { ImageCard } from "@/components/customComponents/cardTemplates";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const experiencesByCategory = [
  {
    category: "Water Adventures",
    experiences: [
      {
        id: "w1",
        title: "Scuba Diving",
        description:
          "Explore the Red Sea's vibrant coral reefs and rich underwater paradise with our certified guides.",
        imageUrl:
          "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt",
        href: "/experiences/scuba-diving",
      },
      {
        id: "w2",
        title: "Snorkeling Tours",
        description:
          "Discover colorful marine life just below the surface in Dahab’s most beautiful snorkeling spots.",
        imageUrl:
          "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/experiences/snorkeling-tours",
      },
      {
        id: "w3",
        title: "Windsurfing & Kitesurfing",
        description:
          "Ride the waves and feel the thrill of the wind at the famous Dahab Lagoon.",
        imageUrl:
          "https://www.iksurfmag.com/wp-content/uploads/2023/04/DSC6405.jpg.jpg",
        href: "/experiences/windsurfing-kitesurfing",
      },
    ],
  },
  {
    category: "Desert Adventures",
    experiences: [
      {
        id: "d1",
        title: "Desert Safari",
        description:
          "Experience the thrill of a quad bike ride across the Sinai desert and enjoy Bedouin hospitality.",
        imageUrl:
          "https://desert-safari-egypte.com/wp-content/uploads/2022/11/home-gallery-01.jpg",
        href: "/experiences/desert-safari",
      },
      {
        id: "d2",
        title: "Bedouin Dinner Under the Stars",
        description:
          "A magical evening with authentic Bedouin cuisine, traditional music, and stargazing.",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2huN2dfdeQXp7pYTXEf4RpuOqQi2-jYsQWg&s",
        href: "/experiences/bedouin-dinner",
      },
      {
        id: "d3",
        title: "Rock Climbing & Hiking",
        description:
          "Challenge yourself on the stunning rock faces and hiking trails of the Sinai mountains.",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurCLHN9L4X1TIXGtAxDF8JwJzhS5rjgC0WQ&s",
        href: "/experiences/rock-climbing-hiking",
      },
    ],
  },
  {
    category: "Relaxation & Wellness",
    experiences: [
      {
        id: "r1",
        title: "Sunrise Yoga Sessions",
        description:
          "Start your day with a rejuvenating yoga session on the beach, facing the beautiful sunrise.",
        imageUrl:
          "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/experiences/sunrise-yoga",
      },
      {
        id: "r2",
        title: "Meditation & Spa Treatments",
        description:
          "Find your inner peace with guided meditation and indulge in our relaxing spa packages.",
        imageUrl:
          "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        href: "/experiences/meditation-spa",
      },
    ],
  },
];

export default function Experiences() {
  return (
    <div className="bg-gray-50 dark:bg-black">
      <div>
        <motion.div
          className="relative h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src={`https://freedivedahab.com/wp-content/uploads/2012/09/freedive-training.jpg`}
            alt="Dahab"
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">
              Live the Adventure.{" "}
              <span className="text-amber-400">Create Your Memories.</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white max-w-3xl mx-auto">
              Whether you seek thrill and adventure, or peace and relaxation, we
              offer a range of experiences specially designed to make your trip
              to Dahab unforgettable.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {experiencesByCategory.map((categorySection) => (
            <section key={categorySection.category}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-amber-500 pl-4">
                {categorySection.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categorySection.experiences.map((experience) => (
                  <ImageCard
                    key={experience.id}
                    title={experience.title}
                    description={experience.description}
                    image={experience.imageUrl}
                    href={experience.href}
                    buttonText="View Details"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { ImageCard } from "@/components/customComponents/cardTemplates";
import { motion } from "framer-motion";
import { useDestinations } from "@/context/DestinationsContext";
import HeroSection from "@/components/sections/HeroSection";

export default function Destinations() {
  const { destinations, getAllCategories, getDestinationsByCategory, toggleFavorite, isFavorite } = useDestinations();

 
  const categories = getAllCategories();

  return (
    <div className="dark:bg-black dark:text-amber-50 min-h-screen">
      <HeroSection
        title={<span>Explore Our <span className="text-amber-500">Destinations</span></span>}
        subtitle="Discover your next adventure with our curated travel destinations."
        imageURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s"
      />

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        
        {categories.map((category, categoryIndex) => {
          const categoryDestinations = getDestinationsByCategory(category);
          
          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12 sm:mb-16"
            >
              
              <div className="mb-6 sm:mb-8 flex flex-col items-center">
                <motion.h2
                  className="
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                    font-bold text-gray-900 dark:text-white mb-2
                    border-b-4 border-amber-500 pb-2 text-center
                    w-full max-w-3xl px-4
                  "
                >
                  {category}
                </motion.h2>

                
              </div>

             
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {categoryDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <ImageCard
                      title={destination.title}
                      subtitle={destination.subtitle}
                      description={destination.description}
                      image={destination.imageUrl}
                      badge={destination.badge}
                      rating={destination.rating}
                      location={destination.location}
                      price={destination.price}
                      buttonText="Discover More"
                      href={destination.href}
                      onFavoriteClick={() => toggleFavorite(destination.id)}
                      isFavorite={isFavorite(destination.id)}
                    />
                  </motion.div>
                ))}
              </div>
              {categoryIndex < categories.length - 1 && (
                <div className="mt-12 sm:mt-16 border-t border-gray-200 dark:border-gray-800"></div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { ImageCard } from "@/components/customComponents/cardTemplates";
import { motion } from "framer-motion";
import { useDestinations } from "@/context/DestinationsContext";

export default function Destinations() {
  
  const { destinations, toggleFavorite, isFavorite } = useDestinations();

  return (
    <div className="dark:bg-black dark:text-amber-50 min-h-screen">
      <motion.div
        className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s"
          alt="Dahab underwater"
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        <div className="relative z-20 px-4 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Explore Our <span className="text-amber-400">Destinations</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white max-w-3xl mx-auto">
            From world-class dive sites to historic mountains, discover the
            magic of Dahab.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <ImageCard
              key={destination.id}
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
          ))}
        </div>
      </div>
    </div>
  );
}

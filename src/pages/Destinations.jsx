"use client";

import { ImageCard } from "@/components/customComponents/cardTemplates";
import { motion } from "framer-motion";
import { useDestinations } from "@/context/DestinationsContext";
import HeroSection from "@/components/sections/HeroSection";
export default function Destinations() {
  
  const { destinations, toggleFavorite, isFavorite } = useDestinations();

  return (
    <div className="dark:bg-black dark:text-amber-50 min-h-screen">
      <HeroSection
        title={<span>Explore Our <span className="text-amber-500">Destinations</span></span>}
        subtitle="Discover your next adventure with our curated travel destinations."
        imageURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s"
      />

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

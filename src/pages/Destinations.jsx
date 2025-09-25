"use client";

import { ImageCard } from "@/components/cardTemplates";
import { motion } from "framer-motion";


const destinationsData = [
  {
    id: 1,
    title: 'Blue Hole',
    description: 'World-famous diving spot with crystal clear water and vibrant marine life.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1', 
    href: "/destinations/blue-hole",
    subtitle: "World Famous Dive Site",
    badge: "Must Visit",
    rating: "4.9",
    location: "Dahab Coast",
    price: "$85",
  },
  {
    id: 2,
    title: 'Mount Sinai',
    description: 'A sacred mountain with breathtaking sunrise views and deep historical significance.',
    imageUrl: 'https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg',
    href: '/destinations/mount-sinai',
    subtitle: "Sacred Mountain",
    badge: "Spiritual Journey",
    rating: "4.8",
    location: "Sinai Peninsula",
    price: "$45",
  },
  {
    id: 3,
    title: 'Colored Canyon',
    description: 'Hike through spectacular rock formations with an incredible palette of natural colors.',
    imageUrl: 'https://www.youregypttours.com/storage/1208/1681127279.jpg',
    href: '/destinations/colored-canyon',
    subtitle: "Natural Wonder",
    badge: "Adventure",
    rating: "4.7",
    location: "Nuweiba Road",
    price: "$55",
    buttonText: "Discover More",
  },
  {
    id: 4,
    title: 'Dahab Lagoon',
    description: 'The perfect spot for windsurfing and kitesurfing, with calm waters and reliable winds.',
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1',        
    href: '/destinations/dahab-lagoon',
    subtitle: "Windsurfing & Kitesurfing",
    badge: "Water Sports",
    rating: "4.6",
    location: "North Dahab",
    price: "$60",
    buttonText: "Discover More",
  },
  {
    id: 5,
    title: 'Abu Galum',
    description: 'A stunning protectorate where the desert meets the sea.',
    imageUrl: 'https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill/multitenacy/wikis/2024-10-05-03-38-29-167015d7589e39.webp',
    href: '/destinations/abu-galum',
    subtitle: "Desert & Sea",
    badge: "Nature Reserve",
    rating: "4.8",
    location: "South Sinai",
    price: "$70",
    buttonText: "Discover More",
  },
];


export default function Destinations() {
  return (
    <div className="dark:bg-black dark:text-amber-50 min-h-screen">
      <motion.div 
  className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden mb-12" // تم تغيير h-screen إلى h-[60vh]
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
>
  <motion.img
    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s`}
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
      From world-class dive sites to historic mountains, discover the magic of Dahab.
    </p>
  </div>
</motion.div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsData.map((destination) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
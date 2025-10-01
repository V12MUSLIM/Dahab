"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";

import { Button } from '@/components/ui/button';
import {MarqueeItem,MarqueeContent} from "../ui/shadcn-io/marquee/index";


export const destinationsData = [
  {
    id: 1,
    title: "Blue Hole",
    description:
      "World-famous diving spot with crystal clear water and vibrant marine life, offering unparalleled underwater experiences for divers of all levels. Its stunning geological formations and diverse ecosystem make it a must-visit.",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1",
    href: "/destinations/blue-hole",
    IdPage: "blue-hole",
    subtitle: "World Famous Dive Site",
    badge: "Must Visit",
    rating: "4.9",
    location: "Dahab Coast",
    price: "$85",
  },
  {
    id: 2,
    title: "Mount Sinai",
    description:
      "A sacred mountain with breathtaking sunrise views and deep historical significance, revered by multiple faiths. The journey to its peak is an unforgettable spiritual and physical challenge.",
    imageUrl:
      "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg",
    href: "/destinations/mount-sinai",
    IdPage: "mount-sinai",
    subtitle: "Sacred Mountain",
    badge: "Spiritual Journey",
    rating: "4.8",
    location: "Sinai Peninsula",
    price: "$45",
  },
  {
    id: 3,
    title: "Colored Canyon",
    description:
      "Hike through spectacular rock formations with an incredible palette of natural colors. A true masterpiece of nature that captivates every visitor.",
    imageUrl: "https://www.youregypttours.com/storage/1208/1681127279.jpg",
    href: "/destinations/colored-canyon",
    IdPage: "colored-canyon",
    subtitle: "Natural Wonder",
    badge: "Adventure",
    rating: "4.7",
    location: "Nuweiba Road",
    price: "$55",
  },
  {
    id: 4,
    title: "Dahab Lagoon",
    description:
      "The perfect spot for windsurfing and kitesurfing, with calm waters and reliable winds, making it ideal for both beginners and professionals.",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1",
    href: "/destinations/dahab-lagoon",
    IdPage: "dahab-lagoon",
    subtitle: "Windsurfing & Kitesurfing",
    badge: "Water Sports",
    rating: "4.6",
    location: "North Dahab",
    price: "$60",
  },
  {
    id: 5,
    title: "Abu Galum",
    description:
      "A stunning protectorate where the desert meets the sea, offering a unique landscape and pristine coral reefs perfect for snorkeling.",
    imageUrl:
      "https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill/multitenacy/wikis/2024-10-05-03-38-29-167015d7589e39.webp",
    href: "/destinations/abu-galum",
    IdPage: "abu-galum",
    subtitle: "Desert & Sea",
    badge: "Nature Reserve",
    rating: "4.8",
    location: "South Sinai",
    price: "$70",
  },
];

const galleryImages = [
    {
      src: `${import.meta.env.BASE_URL}image1.jpeg`,
      alt: "Blue Lagoon in Dahab",
      title: "Blue Lagoon Paradise",
      description: "Crystal clear waters perfect for swimming"
    },
    {
      src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg",
      alt: "Blue Hole diving spot",
      title: "Famous Blue Hole",
      description: "World's most iconic diving destination"
    },
    {
      src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg",
      alt: "Dahab coastline",
      title: "Stunning Coastline",
      description: "Miles of pristine beaches await"
    },
    {
      src: "https://assets.annahar.com/ContentFilesArchive/422721Image1-1180x677_d.jpg",
      alt: "Desert meets sea",
      title: "Desert Meets Sea",
      description: "Unique landscape of mountains and ocean"
    },
    {
      src: `${import.meta.env.BASE_URL}image2.jpeg`,
      alt: "Sinai mountains sunset",
      title: "Sinai Mountain Sunset",
      description: "Breathtaking views from sacred peaks"
    },
    {
      src: `${import.meta.env.BASE_URL}image3.jpeg`,
      alt: "Blue Hole diving",
      title: "World-Class Diving",
      description: "Explore vibrant coral reefs"
    },
    {
      src: `${import.meta.env.BASE_URL}image4.jpeg`,
      alt: "Bedouin beach camp",
      title: "Bedouin Beach Culture",
      description: "Experience authentic local traditions"
    }
  ];



export default function DestinationDetail() {
  const { IdPage } = useParams();
  const destination = destinationsData.find(d => d.IdPage === IdPage);
  
  
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <h1 className="text-3xl font-bold dark:text-white">Destination not found!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
      <motion.div
        className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 p-6">
    
          <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
            variants={fadeInUp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {destination.title}
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-xl lg:text-2xl font-semibold text-amber-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {destination.subtitle}
          </motion.p>
        </div>
      </motion.div>


       <MarqueeContent className="py-4">
            {galleryImages.map((image, index) => (
              <MarqueeItem key={index}>
                <motion.div className="relative group overflow-hidden rounded-xl mx-2">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="h-72 w-auto rounded-xl object-cover shadow-xl dark:shadow-2xl"
                    whileHover={{ scale: 1.08, rotateY: 5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-end">
                    <div className="p-6 w-full">
                      <p className="text-white font-bold text-lg mb-1">
                        {image.title}
                      </p>
                      <p className="text-white/80 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
    
     
     
     
     
   
     
     
     
     

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {destination.badge && (
          <motion.span
            className="inline-block bg-amber-500 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {destination.badge}
          </motion.span>
        )}

        <motion.p
          className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {destination.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <span className="text-amber-500 text-3xl">⭐</span>
            <div>
              <p className="text-xl font-bold">{destination.rating}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <span className="text-blue-500 text-3xl">📍</span>
            <div>
              <p className="text-xl font-bold">{destination.location}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="text-green-500 text-3xl">💰</span>
            <div>
              <p className="text-xl font-bold">{destination.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Per Person</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <Link to="/destinations">
            <Button
              size="lg"
              className="bg-amber-500 text-gray-900 hover:bg-amber-600 font-bold text-lg"
            >
              Back to All Destinations
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
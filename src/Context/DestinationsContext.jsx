
"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';

const destinationsInitialData = [
  
  // ==================== Water Adventures Category  ====================
  
  // 1. Blue Hole 
  {
    id: 1,
    category: "Water Adventures",
    title: "Blue Hole",
    description: "World-famous diving spot with crystal clear water and vibrant marine life, offering unparalleled underwater experiences for divers of all levels.",
    longDescription: "The Blue Hole in Dahab is a legendary dive site that has captured the imagination of divers worldwide. This natural submarine sinkhole plunges to depths of over 130 meters, creating a mesmerizing vertical shaft through the reef. The site features stunning coral walls, diverse marine ecosystems, and the famous archway tunnel at 55 meters depth. Whether you're a recreational diver exploring the shallow sections or a technical diver venturing into the depths, the Blue Hole offers an unforgettable underwater experience with visibility often exceeding 40 meters.",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1",
    href: "/destinations/blue-hole",
    IdPage: "blue-hole",
    subtitle: "World Famous Dive Site",
    badge: "Must Visit",
    rating: "4.9",
    location: "Dahab Coast",
    price: "$85",
    duration: "Full Day (8 hours)",
    groupSize: "Max 12 people",
    difficulty: "Intermediate to Advanced",
    bestTime: "March to November",
    galleryImages: [
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Blue Hole aerial view", title: "Iconic Blue Hole", description: "Aerial view of famous diving spot" },
      { src: "https://www.scubadiving.com/sites/scubadiving.com/files/styles/655_1x_/public/images/2023/02/blue-hole-dahab-egypt.jpg", alt: "Underwater view", title: "Underwater Paradise", description: "Crystal clear waters" },
      { src: "https://cdn.getyourguide.com/img/tour/5c3f4f4e8c9c6.jpeg/98.jpg", alt: "Diving at Blue Hole", title: "Professional Diving", description: "Expert instructors" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Coral reef", title: "Vibrant Corals", description: "Rich marine ecosystem" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Beach view", title: "Beach Setting", description: "Relaxing atmosphere" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "The Archway", title: "Famous Archway", description: "55-meter challenge" }
    ],
    locationDetails: {
      address: "Blue Hole Beach, Dahab, South Sinai Governorate, Egypt",
      coordinates: { lat: 28.5942, lng: 34.5324 },
      distance: "15 km north of Dahab city center",
      access: "Accessible by car or taxi, approximately 20 minutes from Dahab",
      nearby: ["The Bells dive site (100m)", "Laguna Restaurant (500m)", "Blue Beach Club (1km)", "Canyon dive site (3km)"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Hotel Pickup", description: "Pickup from your hotel in Dahab", duration: "20 minutes", icon: "Car" },
      { time: "08:30 AM", title: "Arrival & Registration", description: "Check-in at dive center", duration: "30 minutes", icon: "Info" },
      { time: "09:00 AM", title: "Safety Briefing", description: "Comprehensive dive briefing", duration: "30 minutes", icon: "Shield" },
      { time: "10:00 AM", title: "First Dive", description: "Main dive to explore the Blue Hole", duration: "45 minutes", icon: "Waves" },
      { time: "12:00 PM", title: "Second Dive", description: "Additional dive or snorkeling", duration: "40 minutes", icon: "Fish" },
      { time: "01:00 PM", title: "Lunch Break", description: "Egyptian lunch at beachside restaurant", duration: "60 minutes", icon: "Utensils" },
      { time: "03:30 PM", title: "Return Transfer", description: "Transfer back to hotel", duration: "20 minutes", icon: "Car" }
    ],
    included: ["PADI instructor", "All diving equipment", "Underwater photography", "Lunch", "Hotel transfer", "Insurance", "Two tank dives", "Refreshments"],
    notIncluded: ["Personal equipment rent", "Nitrox fills", "Tips", "Souvenirs"],
    activities: [
      { name: "Deep Diving", icon: "Waves", description: "Explore depths up to 130m", difficulty: "Advanced", duration: "45 minutes" },
      { name: "Coral Reef Tour", icon: "Fish", description: "Discover marine life", difficulty: "Beginner", duration: "40 minutes" },
      { name: "Photography", icon: "Camera", description: "Underwater photos included", difficulty: "All levels", duration: "Throughout" },
      { name: "Safety Training", icon: "Shield", description: "Safety briefing", difficulty: "All levels", duration: "30 minutes" }
    ],
    highlights: ["World's most famous blue hole", "Archway at 55m depth", "Rare fish species", "40m+ visibility", "PADI instructors", "Small groups"],
    reviews: [
      { name: "Sarah Johnson", nationality: "USA", rating: 5, comment: "Absolutely breathtaking! Professional instructors and stunning marine life!", date: "Sep 2025", verified: true, helpful: 45 },
      { name: "Ahmed Hassan", nationality: "Egypt", rating: 5, comment: "Best diving experience ever! Amazing visibility!", date: "Aug 2025", verified: true, helpful: 38 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Valid diving certification", icon: "Shield" },
        { text: "Medical fitness", icon: "AlertCircle" },
        { text: "Min age 18 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Swimwear and towel", icon: "Backpack" },
        { text: "Reef-safe sunscreen", icon: "Sun" },
        { text: "Camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation up to 48 hours before"
    }
  },

  // 2. Dahab Lagoon 
  {
    id: 2,
    category: "Water Adventures",
    title: "Dahab Lagoon",
    description: "Perfect spot for windsurfing and kitesurfing with shallow calm waters and consistent winds ideal for all skill levels.",
    longDescription: "Dahab Lagoon is world-renowned for kitesurfing and windsurfing. The shallow flat waters with steady thermal winds create perfect learning conditions. Professional IKO certified instructors offer comprehensive lessons in multiple languages. The lagoon's unique geography provides a safe environment with water rarely exceeding waist depth, making it ideal for beginners while still challenging for professionals.",
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1",
    href: "/destinations/dahab-lagoon",
    IdPage: "dahab-lagoon",
    subtitle: "Windsurfing & Kitesurfing Paradise",
    badge: "Water Sports",
    rating: "4.6",
    location: "North Dahab",
    price: "$60",
    duration: "Full Day (6 hours)",
    groupSize: "Max 8 people",
    difficulty: "Beginner to Advanced",
    bestTime: "March to November",
    galleryImages: [
      { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1", alt: "Kitesurfing", title: "Perfect Conditions", description: "Ideal shallow waters" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Windsurfing", title: "Learn to Surf", description: "Professional instruction" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Lagoon", title: "Stunning Lagoon", description: "Crystal clear waters" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Beach", title: "Beach Life", description: "Relaxed atmosphere" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Equipment", title: "Modern Gear", description: "Latest equipment" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Mountains", title: "Scenic Backdrop", description: "Mountains meet sea" }
    ],
    locationDetails: {
      address: "Dahab Lagoon, North Dahab, South Sinai, Egypt",
      coordinates: { lat: 28.5167, lng: 34.5167 },
      distance: "3 km from Dahab center",
      access: "Easy walk, bike, or taxi",
      nearby: ["Kitesurf schools", "Beach clubs (200m)", "Restaurants (100m)", "Dive centers (500m)"]
    },
    detailedItinerary: [
      { time: "09:00 AM", title: "Meeting", description: "Meet at kitesurf center", duration: "15 min", icon: "Info" },
      { time: "09:15 AM", title: "Theory", description: "Safety and techniques", duration: "45 min", icon: "Shield" },
      { time: "10:00 AM", title: "Equipment Setup", description: "Learn equipment handling", duration: "30 min", icon: "Check" },
      { time: "10:30 AM", title: "First Session", description: "Begin in shallow water", duration: "90 min", icon: "Waves" },
      { time: "12:00 PM", title: "Lunch", description: "Rest and refreshments", duration: "60 min", icon: "Utensils" },
      { time: "01:00 PM", title: "Second Session", description: "Continue practice", duration: "90 min", icon: "Wind" },
      { time: "03:30 PM", title: "Certificate", description: "Review and certificate", duration: "30 min", icon: "Award" }
    ],
    included: ["IKO instructor", "All equipment", "Safety gear", "Beach access", "Refreshments", "Certificate", "Insurance"],
    notIncluded: ["Lunch", "Transport", "Wetsuit ($10)", "GoPro rental", "Personal equipment"],
    activities: [
      { name: "Kitesurfing", icon: "Wind", description: "Learn from scratch", difficulty: "Beginner", duration: "Full day" },
      { name: "Windsurfing", icon: "Waves", description: "Master techniques", difficulty: "Beginner", duration: "Full day" },
      { name: "SUP Boarding", icon: "Waves", description: "Stand-up paddleboard", difficulty: "Easy", duration: "2h" },
      { name: "Beach Relaxation", icon: "Sun", description: "Enjoy pristine beach", difficulty: "Easy", duration: "Anytime" }
    ],
    highlights: ["World-class spot", "Shallow safe waters", "IKO instructors", "Latest equipment", "Year-round winds", "Beautiful setting"],
    reviews: [
      { name: "Tom Anderson", nationality: "USA", rating: 5, comment: "Best kitesurf spot ever! Great instructors and perfect conditions!", date: "Oct 2025", verified: true, helpful: 58 },
      { name: "Nina Petrova", nationality: "Russia", rating: 5, comment: "Learned to windsurf here. Perfect for beginners!", date: "Sep 2025", verified: true, helpful: 44 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Swimming ability", icon: "Waves" },
        { text: "No experience needed", icon: "Info" },
        { text: "Min age 10 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Swimwear", icon: "Backpack" },
        { text: "Sunscreen", icon: "Sun" },
        { text: "Water shoes (optional)", icon: "Info" },
        { text: "Change of clothes", icon: "Backpack" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // 3. Three Pools Snorkeling 
  {
    id: 3,
    category: "Water Adventures",
    title: "Three Pools Snorkeling",
    description: "Hidden gem featuring three natural lagoons with incredible coral gardens and abundant colorful marine life.",
    longDescription: "Three Pools is one of Dahab's best-kept secrets for snorkeling. These natural lagoons feature pristine coral reefs, crystal clear water, and an abundance of tropical fish. The three pools are formed by natural rock formations creating sheltered areas perfect for snorkeling. Accessible by a scenic coastal walk or boat, it's ideal for families and snorkeling enthusiasts.",
    imageUrl: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg",
    href: "/destinations/three-pools",
    IdPage: "three-pools",
    subtitle: "Hidden Snorkeling Paradise",
    badge: "Snorkeling",
    rating: "4.8",
    location: "North Dahab",
    price: "$35",
    duration: "Half Day (4 hours)",
    groupSize: "Max 12 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Three Pools", title: "Natural Pools", description: "Crystal clear lagoons" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Coral", title: "Vibrant Corals", description: "Pristine reef gardens" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Fish", title: "Tropical Fish", description: "Abundant marine life" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Snorkeling", title: "Family Snorkeling", description: "Perfect for all ages" },
      { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1", alt: "Beach", title: "Beautiful Beach", description: "Relaxing setting" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Underwater", title: "Underwater World", description: "Amazing visibility" }
    ],
    locationDetails: {
      address: "Three Pools, North Dahab, South Sinai, Egypt",
      coordinates: { lat: 28.5500, lng: 34.5200 },
      distance: "10 km north of Dahab",
      access: "Coastal walk or boat transfer",
      nearby: ["Eel Garden (1km)", "Napoleon Reef (2km)", "Bedouin camps", "Blue Lagoon (3km)"]
    },
    detailedItinerary: [
      { time: "09:00 AM", title: "Pickup", description: "Hotel pickup", duration: "20 min", icon: "Car" },
      { time: "09:30 AM", title: "Equipment", description: "Snorkel gear fitting", duration: "15 min", icon: "Check" },
      { time: "10:00 AM", title: "First Pool", description: "Snorkel in shallow lagoon", duration: "45 min", icon: "Fish" },
      { time: "11:00 AM", title: "Second Pool", description: "Explore coral gardens", duration: "45 min", icon: "Waves" },
      { time: "12:00 PM", title: "Third Pool", description: "Deep pool snorkeling", duration: "45 min", icon: "Fish" },
      { time: "01:00 PM", title: "Return", description: "Transfer back to hotel", duration: "30 min", icon: "Car" }
    ],
    included: ["Snorkel guide", "Equipment (mask, fins, snorkel)", "Refreshments", "Boat option", "Insurance", "Photos"],
    notIncluded: ["Lunch", "Wetsuit rental", "Underwater camera", "Tips"],
    activities: [
      { name: "Snorkeling", icon: "Fish", description: "Explore three coral pools", difficulty: "Easy", duration: "2h" },
      { name: "Swimming", icon: "Waves", description: "Swim in natural lagoons", difficulty: "Easy", duration: "Flexible" },
      { name: "Beach Relaxation", icon: "Sun", description: "Enjoy pristine beach", difficulty: "Easy", duration: "1h" },
      { name: "Marine Life Spotting", icon: "Camera", description: "See colorful fish", difficulty: "Easy", duration: "Throughout" }
    ],
    highlights: ["Three natural lagoons", "Pristine coral reefs", "Abundant tropical fish", "Family-friendly", "Shallow safe waters", "Hidden gem"],
    reviews: [
      { name: "Anna Schmidt", nationality: "Germany", rating: 5, comment: "Perfect snorkeling spot! Kids loved it and felt safe!", date: "Oct 2025", verified: true, helpful: 52 },
      { name: "Youssef Ahmed", nationality: "Egypt", rating: 5, comment: "Best coral gardens in Dahab! Not crowded at all!", date: "Sep 2025", verified: true, helpful: 47 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Swimming ability", icon: "Waves" },
        { text: "Min age 6 years", icon: "Info" },
        { text: "Basic fitness", icon: "Shield" }
      ],
      whatToBring: [
        { text: "Swimwear", icon: "Backpack" },
        { text: "Towel", icon: "Info" },
        { text: "Reef-safe sunscreen", icon: "Sun" },
        { text: "Waterproof camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // 4. Ras Mohammed National Park Diving 
  {
    id: 4,
    category: "Water Adventures",
    title: "Ras Mohammed National Park",
    description: "Egypt's premier marine park with pristine coral reefs, dramatic walls, and incredible marine biodiversity.",
    longDescription: "Ras Mohammed National Park is Egypt's first national park and one of the world's best diving destinations. Located at the southern tip of the Sinai Peninsula, it offers spectacular underwater landscapes with vertical walls, vibrant coral gardens, and an amazing variety of marine life including sharks, rays, and schools of fish. The park features famous dive sites like Shark Reef and Yolanda Reef.",
    imageUrl: "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt",
    href: "/destinations/ras-mohammed",
    IdPage: "ras-mohammed",
    subtitle: "Egypt's Premier Marine Park",
    badge: "National Park",
    rating: "4.9",
    location: "South Sinai",
    price: "$95",
    duration: "Full Day (9 hours)",
    groupSize: "Max 15 people",
    difficulty: "Intermediate",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt", alt: "Coral reef", title: "Pristine Reefs", description: "World-class diving" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Sharks", title: "Shark Encounters", description: "Safe shark diving" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Walls", title: "Dramatic Walls", description: "Vertical drops" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Marine life", title: "Rich Biodiversity", description: "Abundant species" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Dive boat", title: "Professional Service", description: "Comfortable boats" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Park view", title: "Natural Beauty", description: "Protected paradise" }
    ],
    locationDetails: {
      address: "Ras Mohammed National Park, South Sinai, Egypt",
      coordinates: { lat: 27.7319, lng: 34.2354 },
      distance: "25 km from Sharm El Sheikh",
      access: "By boat only from Sharm El Sheikh or Dahab",
      nearby: ["Shark Reef", "Yolanda Reef", "Ras Za'atar", "Jackfish Alley"]
    },
    detailedItinerary: [
      { time: "07:00 AM", title: "Hotel Pickup", description: "Pickup from Sharm hotels", duration: "30 min", icon: "Car" },
      { time: "08:00 AM", title: "Boat Departure", description: "Set sail to national park", duration: "60 min", icon: "Waves" },
      { time: "09:30 AM", title: "First Dive", description: "Shark Reef dive", duration: "45 min", icon: "Fish" },
      { time: "11:00 AM", title: "Surface Interval", description: "Rest and snacks on boat", duration: "60 min", icon: "Coffee" },
      { time: "12:00 PM", title: "Lunch", description: "Buffet lunch on boat", duration: "60 min", icon: "Utensils" },
      { time: "01:00 PM", title: "Second Dive", description: "Yolanda Reef dive", duration: "45 min", icon: "Waves" },
      { time: "03:00 PM", title: "Return Journey", description: "Sail back to marina", duration: "60 min", icon: "Car" },
      { time: "04:00 PM", title: "Hotel Drop-off", description: "Transfer back to hotel", duration: "30 min", icon: "Car" }
    ],
    included: ["PADI guide", "Boat transport", "All equipment", "Two dives", "Lunch buffet", "Snacks & drinks", "Park fees", "Insurance"],
    notIncluded: ["Hotel transfer (available)", "Personal equipment", "Nitrox", "Tips"],
    activities: [
      { name: "Wall Diving", icon: "Waves", description: "Explore dramatic vertical walls", difficulty: "Intermediate", duration: "45 min" },
      { name: "Shark Viewing", icon: "Fish", description: "Encounter reef sharks safely", difficulty: "Intermediate", duration: "Throughout" },
      { name: "Wreck Exploration", icon: "Camera", description: "Visit Yolanda shipwreck", difficulty: "Intermediate", duration: "45 min" },
      { name: "Snorkeling", icon: "Waves", description: "Alternative for non-divers", difficulty: "Easy", duration: "Flexible" }
    ],
    highlights: ["Egypt's first national park", "World-famous dive sites", "Shark and ray encounters", "Pristine coral reefs", "Dramatic walls", "Professional operation"],
    reviews: [
      { name: "Marco Rossi", nationality: "Italy", rating: 5, comment: "Best diving in Egypt! Saw sharks, rays, and incredible corals!", date: "Oct 2025", verified: true, helpful: 89 },
      { name: "Layla Ahmed", nationality: "UAE", rating: 5, comment: "Absolutely stunning! Professional crew and amazing marine life!", date: "Sep 2025", verified: true, helpful: 73 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Advanced Open Water or equivalent", icon: "Shield" },
        { text: "Recent diving experience", icon: "AlertCircle" },
        { text: "Min age 15 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Diving certification", icon: "Shield" },
        { text: "Swimwear", icon: "Backpack" },
        { text: "Towel", icon: "Info" },
        { text: "Sunscreen", icon: "Sun" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 5. Eel Garden Snorkeling 
  {
    id: 5,
    category: "Water Adventures",
    title: "Eel Garden",
    description: "Unique snorkeling spot where hundreds of garden eels dance in the sandy seabed, creating an mesmerizing spectacle.",
    longDescription: "Eel Garden is one of Dahab's most unique snorkeling experiences. This shallow sandy area is home to hundreds of garden eels that emerge from the sand, swaying with the current like an underwater field of flowers. The site also features beautiful coral formations and abundant tropical fish. It's perfect for snorkelers and photographers looking for something truly special.",
    imageUrl: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    href: "/destinations/eel-garden",
    IdPage: "eel-garden",
    subtitle: "Unique Marine Spectacle",
    badge: "Unique",
    rating: "4.7",
    location: "Dahab Bay",
    price: "$30",
    duration: "Half Day (3 hours)",
    groupSize: "Max 10 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Garden eels", title: "Dancing Eels", description: "Hundreds of garden eels" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Coral", title: "Coral Gardens", description: "Beautiful formations" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Fish", title: "Tropical Fish", description: "Colorful species" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Snorkeling", title: "Easy Snorkeling", description: "Shallow waters" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Beach", title: "Beach Access", description: "Easy entry" },
      { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1", alt: "Underwater", title: "Clear Waters", description: "Excellent visibility" }
    ],
    locationDetails: {
      address: "Eel Garden, Dahab Bay, South Sinai, Egypt",
      coordinates: { lat: 28.4850, lng: 34.5150 },
      distance: "2 km from Dahab center",
      access: "Easy shore entry from beach",
      nearby: ["Lighthouse (500m)", "Napoleon Reef (1km)", "Islands dive site (800m)", "Dahab promenade (1km)"]
    },
    detailedItinerary: [
      { time: "10:00 AM", title: "Meeting Point", description: "Meet at Eel Garden beach", duration: "10 min", icon: "MapPin" },
      { time: "10:15 AM", title: "Equipment", description: "Snorkel gear and briefing", duration: "15 min", icon: "Check" },
      { time: "10:30 AM", title: "Snorkeling", description: "Explore eel garden", duration: "90 min", icon: "Fish" },
      { time: "12:00 PM", title: "Beach Time", description: "Relax on beach", duration: "30 min", icon: "Sun" },
      { time: "12:30 PM", title: "Finish", description: "Return equipment", duration: "10 min", icon: "Check" }
    ],
    included: ["Snorkel guide", "Mask, fins, snorkel", "Life jacket (optional)", "Refreshments", "Beach access", "Photos"],
    notIncluded: ["Food", "Wetsuit", "Underwater camera", "Tips"],
    activities: [
      { name: "Eel Watching", icon: "Fish", description: "Observe hundreds of garden eels", difficulty: "Easy", duration: "90 min" },
      { name: "Coral Snorkeling", icon: "Waves", description: "Explore coral formations", difficulty: "Easy", duration: "Throughout" },
      { name: "Fish Spotting", icon: "Camera", description: "See tropical fish species", difficulty: "Easy", duration: "Throughout" },
      { name: "Photography", icon: "Camera", description: "Unique photo opportunities", difficulty: "Easy", duration: "Throughout" }
    ],
    highlights: ["Unique eel spectacle", "Shallow safe waters", "Easy shore entry", "Beautiful corals", "Abundant fish", "Great for beginners"],
    reviews: [
      { name: "Sophie Laurent", nationality: "France", rating: 5, comment: "So unique! Never seen anything like it. The eels are fascinating!", date: "Oct 2025", verified: true, helpful: 56 },
      { name: "Omar Khalil", nationality: "Egypt", rating: 5, comment: "Perfect spot for families. Kids were amazed by the eels!", date: "Sep 2025", verified: true, helpful: 48 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Swimming ability", icon: "Waves" },
        { text: "Min age 5 years", icon: "Info" },
        { text: "No experience needed", icon: "Check" }
      ],
      whatToBring: [
        { text: "Swimwear", icon: "Backpack" },
        { text: "Towel", icon: "Info" },
        { text: "Sunscreen", icon: "Sun" },
        { text: "Camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // ==================== Desert Adventures Category (5) ====================

  // 6. Mount Sinai 
  {
    id: 6,
    category: "Desert Adventures",
    title: "Mount Sinai",
    description: "Sacred mountain with breathtaking sunrise views and deep historical significance for Judaism, Christianity, and Islam.",
    longDescription: "Mount Sinai, also known as Jebel Musa, stands at 2,285 meters. According to biblical tradition, this is where Moses received the Ten Commandments. The journey combines spiritual reflection with physical challenge, rewarding climbers with one of the most spectacular sunrises in the world. At the base lies St. Catherine's Monastery, a UNESCO World Heritage Site.",
    imageUrl: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg",
    href: "/destinations/mount-sinai",
    IdPage: "mount-sinai",
    subtitle: "Sacred Mountain Experience",
    badge: "Spiritual Journey",
    rating: "4.8",
    location: "Sinai Peninsula",
    price: "$45",
    duration: "Overnight (12 hours)",
    groupSize: "Max 15 people",
    difficulty: "Moderate",
    bestTime: "October to April",
    galleryImages: [
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Sunrise", title: "Sacred Sunrise", description: "Breathtaking summit views" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Trail", title: "The Journey", description: "Historic pilgrimage path" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Steps", title: "3,750 Steps", description: "Steps of Repentance" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Monastery", title: "St Catherine's", description: "UNESCO Heritage Site" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Summit", title: "Summit Chapel", description: "Holy Trinity Chapel" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Desert", title: "Sinai Desert", description: "Majestic vistas" }
    ],
    locationDetails: {
      address: "Mount Sinai, Saint Katherine, South Sinai, Egypt",
      coordinates: { lat: 28.5392, lng: 33.9751 },
      distance: "140 km from Dahab",
      access: "Organized tours with transport",
      nearby: ["St. Catherine's Monastery", "Chapel of Holy Trinity", "Moses' Spring", "Burning Bush"]
    },
    detailedItinerary: [
      { time: "08:00 PM", title: "Evening Pickup", description: "Pickup from hotel", duration: "Varies", icon: "Car" },
      { time: "11:00 PM", title: "Begin Night Hike", description: "Start ascent under stars", duration: "2.5-3h", icon: "Mountain" },
      { time: "02:00 AM", title: "Summit Arrival", description: "Reach summit with tea", duration: "Arrival", icon: "Check" },
      { time: "05:30 AM", title: "Sunrise", description: "Watch spectacular sunrise", duration: "30 min", icon: "Sunrise" },
      { time: "06:30 AM", title: "Descent", description: "Descend via steps", duration: "2h", icon: "Mountain" },
      { time: "09:30 AM", title: "Breakfast", description: "Hearty breakfast", duration: "45 min", icon: "Utensils" }
    ],
    included: ["Bedouin guide", "Transport", "Permits", "Camel option", "Tea at summit", "Blankets", "Breakfast", "Insurance"],
    notIncluded: ["Lunch/dinner", "Sleeping bag ($5)", "Tips", "Souvenirs"],
    activities: [
      { name: "Night Hiking", icon: "Mountain", description: "Climb under stars", difficulty: "Moderate", duration: "2.5-3h" },
      { name: "Sunrise Viewing", icon: "Sunrise", description: "Spectacular sunrise", difficulty: "Easy", duration: "30 min" },
      { name: "Monastery Tour", icon: "Camera", description: "UNESCO site visit", difficulty: "Easy", duration: "45 min" },
      { name: "Camel Trek", icon: "Car", description: "Optional camel ride", difficulty: "Easy", duration: "3h" }
    ],
    highlights: ["Biblical Mount Sinai", "UNESCO monastery", "3,750 stone steps", "Bedouin hospitality", "360° desert views", "Spiritual experience"],
    reviews: [
      { name: "John Smith", nationality: "UK", rating: 5, comment: "Magical sunrise! Guide shared fascinating stories!", date: "Oct 2025", verified: true, helpful: 67 },
      { name: "Fatima Ali", nationality: "UAE", rating: 5, comment: "Once in a lifetime journey! Very moving experience!", date: "Sep 2025", verified: true, helpful: 54 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Good fitness level", icon: "Shield" },
        { text: "Hiking shoes", icon: "AlertCircle" },
        { text: "Min age 12 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Warm jacket (essential!)", icon: "Backpack" },
        { text: "Hiking boots", icon: "Backpack" },
        { text: "Flashlight", icon: "Sun" },
        { text: "Water (2L)", icon: "Info" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // 7. Colored Canyon
  {
    id: 7,
    category: "Desert Adventures",
    title: "Colored Canyon",
    description: "Hike through spectacular multicolored rock formations showcasing nature's artistry over millions of years.",
    longDescription: "The Colored Canyon features narrow passages through walls painted in brilliant shades of red, orange, yellow, purple, and white. Created by millions of years of erosion, this 800-meter natural cathedral showcases incredible geological forces with some sections so narrow you can touch both walls.",
    imageUrl: "https://www.youregypttours.com/storage/1208/1681127279.jpg",
    href: "/destinations/colored-canyon",
    IdPage: "colored-canyon",
    subtitle: "Natural Geological Wonder",
    badge: "Adventure",
    rating: "4.7",
    location: "Nuweiba Road, Sinai",
    price: "$55",
    duration: "Half Day (5 hours)",
    groupSize: "Max 10 people",
    difficulty: "Easy to Moderate",
    bestTime: "October to May",
    galleryImages: [
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Colored rocks", title: "Rainbow Rocks", description: "Multicolored formations" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Canyon", title: "Natural Art", description: "Million-year patterns" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Passage", title: "Narrow Passage", description: "Touch both walls" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Hiking", title: "Adventure", description: "Family friendly" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Walls", title: "Towering Walls", description: "Up to 40m high" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Desert", title: "Desert Safari", description: "4x4 adventure" }
    ],
    locationDetails: {
      address: "Colored Canyon, Nuweiba, South Sinai, Egypt",
      coordinates: { lat: 29.0667, lng: 34.7167 },
      distance: "80 km north of Dahab",
      access: "4x4 vehicle only, 1.5h drive",
      nearby: ["Ain Khudra Oasis (10km)", "Mushroom Rock (5km)", "White Canyon (15km)"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Hotel Pickup", description: "4x4 pickup", duration: "30 min", icon: "Car" },
      { time: "09:30 AM", title: "Canyon Arrival", description: "Safety briefing", duration: "15 min", icon: "Info" },
      { time: "10:00 AM", title: "Canyon Hiking", description: "Navigate formations", duration: "2h", icon: "Mountain" },
      { time: "12:00 PM", title: "Photography", description: "Photo opportunities", duration: "30 min", icon: "Camera" },
      { time: "12:30 PM", title: "Bedouin Tea", description: "Traditional tea", duration: "30 min", icon: "Coffee" },
      { time: "01:00 PM", title: "Return", description: "Scenic 4x4 return", duration: "1.5h", icon: "Car" }
    ],
    included: ["Hiking guide", "4x4 transport", "Water & snacks", "Bedouin tea", "Hotel transfer", "Insurance"],
    notIncluded: ["Lunch", "Personal gear", "Professional photos", "Tips"],
    activities: [
      { name: "Canyon Hiking", icon: "Mountain", description: "Navigate colorful passages", difficulty: "Moderate", duration: "2h" },
      { name: "Rock Scrambling", icon: "Waves", description: "Climb formations", difficulty: "Moderate", duration: "Throughout" },
      { name: "Photography", icon: "Camera", description: "Stunning photo ops", difficulty: "Easy", duration: "30 min" },
      { name: "Desert Safari", icon: "Car", description: "Exciting 4x4 journey", difficulty: "Easy", duration: "3h" }
    ],
    highlights: ["Multicolored sandstone", "Narrow passages", "Photography paradise", "4x4 desert safari", "Bedouin culture", "Family friendly"],
    reviews: [
      { name: "Emma Wilson", nationality: "UK", rating: 5, comment: "Colors were stunning! Excellent guide and perfect trip!", date: "Nov 2025", verified: true, helpful: 62 },
      { name: "Mohammed Saleh", nationality: "Egypt", rating: 5, comment: "Perfect for our family. Kids loved it!", date: "Oct 2025", verified: true, helpful: 48 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Basic fitness", icon: "Shield" },
        { text: "Hiking shoes mandatory", icon: "AlertCircle" },
        { text: "Min age 8 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Hiking clothes", icon: "Backpack" },
        { text: "Sturdy shoes", icon: "Backpack" },
        { text: "Sun protection", icon: "Sun" },
        { text: "Camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 8. White Canyon Safari   
  {
    id: 8,
    category: "Desert Adventures",
    title: "White Canyon",
    description: "Explore stunning white limestone formations in narrow canyon passages, a hidden gem of the Sinai desert.",
    longDescription: "White Canyon offers a completely different experience from its colorful neighbor. This canyon features brilliant white limestone walls that create a luminous, almost otherworldly atmosphere. The narrow passages wind through tall walls that seem to glow in the sunlight. Combined with Colored Canyon, this makes for an incredible full-day desert adventure.",
    imageUrl: "https://desert-safari-egypte.com/wp-content/uploads/2022/11/home-gallery-01.jpg",
    href: "/destinations/white-canyon",
    IdPage: "white-canyon",
    subtitle: "Limestone Wonder",
    badge: "Hidden Gem",
    rating: "4.6",
    location: "Nuweiba, Sinai",
    price: "$60",
    duration: "Full Day (7 hours)",
    groupSize: "Max 8 people",
    difficulty: "Moderate",
    bestTime: "October to May",
    galleryImages: [
      { src: "https://desert-safari-egypte.com/wp-content/uploads/2022/11/home-gallery-01.jpg", alt: "White walls", title: "Luminous Walls", description: "Brilliant white limestone" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Canyon passage", title: "Narrow Passages", description: "Winding corridors" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Formations", title: "Natural Sculptures", description: "Unique shapes" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Adventure", title: "Desert Adventure", description: "4x4 exploration" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Landscape", title: "Desert Beauty", description: "Stunning scenery" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Group", title: "Group Adventure", description: "Shared experience" }
    ],
    locationDetails: {
      address: "White Canyon, Nuweiba, South Sinai, Egypt",
      coordinates: { lat: 29.0800, lng: 34.7300 },
      distance: "85 km north of Dahab",
      access: "4x4 only through desert terrain",
      nearby: ["Colored Canyon (5km)", "Mushroom Rock (10km)", "Bedouin villages"]
    },
    detailedItinerary: [
      { time: "07:30 AM", title: "Pickup", description: "Hotel pickup in 4x4", duration: "30 min", icon: "Car" },
      { time: "09:00 AM", title: "Desert Drive", description: "Scenic 4x4 journey", duration: "90 min", icon: "Car" },
      { time: "10:30 AM", title: "White Canyon", description: "Explore limestone formations", duration: "2h", icon: "Mountain" },
      { time: "12:30 PM", title: "Lunch", description: "Bedouin lunch", duration: "60 min", icon: "Utensils" },
      { time: "01:30 PM", title: "Colored Canyon", description: "Visit both canyons", duration: "90 min", icon: "Mountain" },
      { time: "03:00 PM", title: "Return", description: "Drive back to Dahab", duration: "2h", icon: "Car" }
    ],
    included: ["Expert guide", "4x4 transport", "Both canyons visit", "Bedouin lunch", "Tea", "Hotel transfer", "Insurance"],
    notIncluded: ["Personal gear", "Tips", "Extra snacks"],
    activities: [
      { name: "Canyon Exploration", icon: "Mountain", description: "Navigate white limestone passages", difficulty: "Moderate", duration: "2h" },
      { name: "Photography", icon: "Camera", description: "Capture unique formations", difficulty: "Easy", duration: "Throughout" },
      { name: "Desert Safari", icon: "Car", description: "Exciting 4x4 adventure", difficulty: "Easy", duration: "4h" },
      { name: "Bedouin Experience", icon: "Shield", description: "Traditional hospitality", difficulty: "Easy", duration: "1h" }
    ],
    highlights: ["Brilliant white limestone", "Narrow winding passages", "Combined with Colored Canyon", "4x4 desert adventure", "Bedouin lunch", "Hidden gem"],
    reviews: [
      { name: "Klaus Schmidt", nationality: "Germany", rating: 5, comment: "Incredible experience! Both canyons in one day is perfect!", date: "Oct 2025", verified: true, helpful: 54 },
      { name: "Amira Hassan", nationality: "Egypt", rating: 5, comment: "The white walls are magical! Great combination tour!", date: "Sep 2025", verified: true, helpful: 47 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Moderate fitness", icon: "Shield" },
        { text: "Hiking shoes", icon: "AlertCircle" },
        { text: "Min age 10 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Hiking gear", icon: "Backpack" },
        { text: "Sun protection", icon: "Sun" },
        { text: "Camera", icon: "Camera" },
        { text: "Water bottle", icon: "Info" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 9. Quad Bike Desert Safari
  {
    id: 9,
    category: "Desert Adventures",
    title: "Quad Bike Desert Safari",
    description: "Thrilling quad bike adventure across golden dunes and desert valleys with Bedouin village visit.",
    longDescription: "Experience the ultimate desert thrill on powerful quad bikes through the stunning Sinai landscape. Ride over golden sand dunes, through desert valleys, and visit a traditional Bedouin village for tea and cultural insights. This adrenaline-pumping adventure combines speed, scenery, and authentic cultural experiences.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2huN2dfdeQXp7pYTXEf4RpuOqQi2-jYsQWg&s",
    href: "/destinations/quad-safari",
    IdPage: "quad-safari",
    subtitle: "Desert Adrenaline",
    badge: "Thrilling",
    rating: "4.7",
    location: "Sinai Desert",
    price: "$50",
    duration: "Half Day (4 hours)",
    groupSize: "Max 12 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2huN2dfdeQXp7pYTXEf4RpuOqQi2-jYsQWg&s", alt: "Quad bikes", title: "Desert Riding", description: "Powerful quad bikes" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Dunes", title: "Golden Dunes", description: "Stunning landscape" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Group", title: "Group Adventure", description: "Share the excitement" },
      { src: "https://desert-safari-egypte.com/wp-content/uploads/2022/11/home-gallery-01.jpg", alt: "Bedouin", title: "Bedouin Village", description: "Cultural experience" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Sunset", title: "Desert Sunset", description: "Golden hour riding" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Mountains", title: "Sinai Backdrop", description: "Majestic views" }
    ],
    locationDetails: {
      address: "Sinai Desert, near Dahab, South Sinai, Egypt",
      coordinates: { lat: 28.5000, lng: 34.4500 },
      distance: "10 km from Dahab",
      access: "Transportation provided",
      nearby: ["Bedouin villages", "Desert oases", "Mountain views"]
    },
    detailedItinerary: [
      { time: "02:00 PM", title: "Pickup", description: "Hotel pickup", duration: "20 min", icon: "Car" },
      { time: "02:30 PM", title: "Safety Briefing", description: "Quad bike training", duration: "20 min", icon: "Shield" },
      { time: "03:00 PM", title: "Desert Ride", description: "Thrilling quad bike ride", duration: "90 min", icon: "Car" },
      { time: "04:30 PM", title: "Bedouin Village", description: "Tea and culture", duration: "45 min", icon: "Coffee" },
      { time: "05:15 PM", title: "Sunset Ride", description: "Return at sunset", duration: "30 min", icon: "Sunrise" },
      { time: "06:00 PM", title: "Return", description: "Back to hotel", duration: "20 min", icon: "Car" }
    ],
    included: ["Quad bike rental", "Safety equipment", "Guide", "Bedouin tea", "Hotel transfer", "Insurance"],
    notIncluded: ["Goggles rental", "Scarf", "Tips", "Photos"],
    activities: [
      { name: "Quad Biking", icon: "Car", description: "Ride powerful quad bikes", difficulty: "Easy", duration: "2h" },
      { name: "Dune Riding", icon: "Mountain", description: "Conquer sand dunes", difficulty: "Easy", duration: "Throughout" },
      { name: "Bedouin Visit", icon: "Shield", description: "Cultural experience", difficulty: "Easy", duration: "45 min" },
      { name: "Sunset Views", icon: "Sunrise", description: "Golden hour ride", difficulty: "Easy", duration: "30 min" }
    ],
    highlights: ["Thrilling quad bike ride", "Golden desert dunes", "Bedouin village visit", "Sunset riding", "No experience needed", "Safety equipment provided"],
    reviews: [
      { name: "Jack Williams", nationality: "UK", rating: 5, comment: "So much fun! Guides were professional and landscape amazing!", date: "Oct 2025", verified: true, helpful: 68 },
      { name: "Yasmin Ali", nationality: "Egypt", rating: 5, comment: "Best adventure! Sunset ride was spectacular!", date: "Sep 2025", verified: true, helpful: 59 }
    ],
    practicalInfo: {
      requirements: [
        { text: "No experience needed", icon: "Check" },
        { text: "Min age 16 years", icon: "Info" },
        { text: "Valid ID required", icon: "Shield" }
      ],
      whatToBring: [
        { text: "Closed shoes", icon: "Backpack" },
        { text: "Sunglasses", icon: "Sun" },
        { text: "Scarf for dust", icon: "Info" },
        { text: "Camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // 10. Bedouin Dinner & Stars   
  {
    id: 10,
    category: "Desert Adventures",
    title: "Bedouin Dinner Under Stars",
    description: "Authentic Bedouin evening with traditional feast, stargazing, and cultural entertainment in desert camp.",
    longDescription: "Experience authentic Bedouin hospitality with a magical evening under the stars. Enjoy a traditional feast cooked in underground ovens, watch cultural performances, and learn about Bedouin customs. The clear desert sky offers spectacular stargazing opportunities, making this an unforgettable cultural and culinary experience.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurCLHN9L4X1TIXGtAxDF8JwJzhS5rjgC0WQ&s",
    href: "/destinations/bedouin-dinner",
    IdPage: "bedouin-dinner",
    subtitle: "Desert Cultural Experience",
    badge: "Cultural",
    rating: "4.8",
    location: "Sinai Desert Camp",
    price: "$40",
    duration: "Evening (4 hours)",
    groupSize: "Max 20 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurCLHN9L4X1TIXGtAxDF8JwJzhS5rjgC0WQ&s", alt: "Camp", title: "Desert Camp", description: "Traditional setting" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Dinner", title: "Bedouin Feast", description: "Traditional cuisine" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Stars", title: "Stargazing", description: "Clear desert sky" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Music", title: "Live Music", description: "Traditional performance" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Fire", title: "Campfire", description: "Cozy atmosphere" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Desert", title: "Desert Night", description: "Magical ambiance" }
    ],
    locationDetails: {
      address: "Bedouin Camp, Sinai Desert, South Sinai, Egypt",
      coordinates: { lat: 28.4800, lng: 34.4200 },
      distance: "15 km from Dahab",
      access: "Transport provided from Dahab",
      nearby: ["Desert valleys", "Mountain views", "Traditional camps"]
    },
    detailedItinerary: [
      { time: "05:00 PM", title: "Pickup", description: "Hotel pickup", duration: "30 min", icon: "Car" },
      { time: "05:45 PM", title: "Camp Arrival", description: "Welcome tea", duration: "15 min", icon: "Coffee" },
      { time: "06:00 PM", title: "Free Time", description: "Explore camp, camel rides", duration: "60 min", icon: "Sun" },
      { time: "07:00 PM", title: "Sunset", description: "Watch desert sunset", duration: "30 min", icon: "Sunrise" },
      { time: "07:30 PM", title: "Dinner", description: "Traditional Bedouin feast", duration: "90 min", icon: "Utensils" },
      { time: "09:00 PM", title: "Entertainment", description: "Music and stargazing", duration: "60 min", icon: "Shield" },
      { time: "10:00 PM", title: "Return", description: "Transfer back", duration: "30 min", icon: "Car" }
    ],
    included: ["Hotel transfer", "Welcome tea", "Full Bedouin dinner", "Entertainment", "Stargazing", "Traditional setup"],
    notIncluded: ["Additional drinks", "Camel rides (optional)", "Tips", "Souvenirs"],
    activities: [
      { name: "Bedouin Dinner", icon: "Utensils", description: "Authentic traditional feast", difficulty: "Easy", duration: "90 min" },
      { name: "Cultural Show", icon: "Shield", description: "Music and dance", difficulty: "Easy", duration: "60 min" },
      { name: "Stargazing", icon: "Sun", description: "Desert night sky", difficulty: "Easy", duration: "Throughout" },
      { name: "Camel Rides", icon: "Mountain", description: "Optional activity", difficulty: "Easy", duration: "Optional" }
    ],
    highlights: ["Authentic Bedouin feast", "Traditional entertainment", "Spectacular stargazing", "Cultural immersion", "Desert atmosphere", "Family-friendly"],
    reviews: [
      { name: "Maria Garcia", nationality: "Spain", rating: 5, comment: "Magical evening! Food was delicious and atmosphere perfect!", date: "Oct 2025", verified: true, helpful: 76 },
      { name: "Ahmed Fouad", nationality: "Egypt", rating: 5, comment: "Best cultural experience in Sinai! Highly recommend!", date: "Sep 2025", verified: true, helpful: 68 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Suitable for all ages", icon: "Check" },
        { text: "Modest dress recommended", icon: "Info" },
        { text: "Vegetarian options available", icon: "Utensils" }
      ],
      whatToBring: [
        { text: "Light jacket (evening)", icon: "Backpack" },
        { text: "Camera", icon: "Camera" },
        { text: "Comfortable shoes", icon: "Info" },
        { text: "Cash for optional activities", icon: "Info" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

 


  {
    id: 11,
    category: "Nature & Wildlife",
    title: "Abu Galum",
    description: "Stunning protectorate where desert meets sea, offering pristine coral reefs and authentic Bedouin culture.",
    longDescription: "Abu Galum is a protected area featuring unique landscapes where Sinai mountains meet the Red Sea. Accessible only by camel, boat, or hiking, this remote paradise offers world-class snorkeling, untouched beaches, and authentic Bedouin experiences. The protectorate is home to diverse wildlife including Nubian ibex.",
    imageUrl: "https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill/multitenacy/wikis/2024-10-05-03-38-29-167015d7589e39.webp",
    href: "/destinations/abu-galum",
    IdPage: "abu-galum",
    subtitle: "Desert Meets Sea",
    badge: "Nature Reserve",
    rating: "4.8",
    location: "South Sinai",
    price: "$70",
    duration: "Full Day (7 hours)",
    groupSize: "Max 10 people",
    difficulty: "Moderate",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill/multitenacy/wikis/2024-10-05-03-38-29-167015d7589e39.webp", alt: "Abu Galum", title: "Desert Meets Sea", description: "Untouched beauty" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Coral", title: "Pristine Reefs", description: "World-class snorkeling" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Beach", title: "Remote Beach", description: "Secluded paradise" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Camel", title: "Camel Trek", description: "Traditional journey" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Bedouin", title: "Bedouin Culture", description: "Authentic experience" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Mountains", title: "Dramatic Landscape", description: "Mountains and sea" }
    ],
    locationDetails: {
      address: "Abu Galum Protectorate, South Sinai, Egypt",
      coordinates: { lat: 28.6667, lng: 34.5833 },
      distance: "25 km north of Dahab",
      access: "Camel, hiking, or boat only",
      nearby: ["Blue Hole (5km)", "Bedouin camps", "Coral reefs", "Nubian ibex habitat"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Pickup", description: "Hotel pickup", duration: "30 min", icon: "Car" },
      { time: "09:00 AM", title: "Camel Trek", description: "Journey to protectorate", duration: "90 min", icon: "Mountain" },
      { time: "10:30 AM", title: "Arrival", description: "Arrive at camp", duration: "15 min", icon: "MapPin" },
      { time: "11:00 AM", title: "Snorkeling", description: "Explore coral reefs", duration: "2h", icon: "Fish" },
      { time: "01:00 PM", title: "Bedouin Lunch", description: "Traditional meal", duration: "90 min", icon: "Utensils" },
      { time: "03:00 PM", title: "Free Time", description: "Relax or swim", duration: "90 min", icon: "Sun" },
      { time: "04:30 PM", title: "Return", description: "Camel ride back", duration: "90 min", icon: "Mountain" }
    ],
    included: ["Camel guide", "Snorkel equipment", "Bedouin lunch", "Tea", "Park fees", "Insurance", "Hotel transfer"],
    notIncluded: ["Personal gear", "Tips", "Extra snacks", "Underwater camera"],
    activities: [
      { name: "Camel Trekking", icon: "Mountain", description: "Desert journey", difficulty: "Easy", duration: "3h total" },
      { name: "Snorkeling", icon: "Fish", description: "Pristine coral reefs", difficulty: "Easy", duration: "2h" },
      { name: "Hiking", icon: "Mountain", description: "Trek through protectorate", difficulty: "Moderate", duration: "2h" },
      { name: "Bedouin Experience", icon: "Shield", description: "Traditional hospitality", difficulty: "Easy", duration: "Throughout" }
    ],
    highlights: ["Protected nature reserve", "Untouched coral reefs", "Authentic Bedouin culture", "Camel trekking", "Remote beaches", "Diverse wildlife"],
    reviews: [
      { name: "Sophie Martin", nationality: "France", rating: 5, comment: "Magical place! Desert and sea combination is breathtaking!", date: "Nov 2025", verified: true, helpful: 71 },
      { name: "Omar Khalil", nationality: "Jordan", rating: 5, comment: "Best snorkeling ever! Unspoiled coral reefs!", date: "Oct 2025", verified: true, helpful: 63 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Good fitness for camel ride", icon: "Shield" },
        { text: "Swimming ability", icon: "Waves" },
        { text: "Min age 10 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Swimwear & hiking clothes", icon: "Backpack" },
        { text: "Sun protection", icon: "Sun" },
        { text: "Underwater camera", icon: "Camera" },
        { text: "Comfortable shoes", icon: "Backpack" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 12. Wadi Gnai Oasis 
  {
    id: 12,
    category: "Nature & Wildlife",
    title: "Wadi Gnai Oasis",
    description: "Explore a hidden desert oasis with natural freshwater springs, lush palm groves, and ancient Bedouin settlements.",
    longDescription: "Wadi Gnai is a secluded oasis in the heart of the Sinai Desert, featuring natural freshwater springs, lush palm groves, and traditional Bedouin life. This peaceful retreat offers a unique glimpse into desert ecology and Bedouin culture. The oasis is fed by underground springs creating a green haven.",
    imageUrl: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg",
    href: "/destinations/wadi-gnai",
    IdPage: "wadi-gnai",
    subtitle: "Hidden Desert Oasis",
    badge: "Nature",
    rating: "4.6",
    location: "Sinai Interior",
    price: "$50",
    duration: "Full Day (6 hours)",
    groupSize: "Max 8 people",
    difficulty: "Moderate",
    bestTime: "October to April",
    galleryImages: [
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Oasis", title: "Hidden Oasis", description: "Natural springs" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Palms", title: "Palm Grove", description: "Lush vegetation" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Pool", title: "Natural Pool", description: "Freshwater swimming" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Bedouin", title: "Bedouin Life", description: "Traditional culture" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Wadi", title: "Desert Valley", description: "Stunning landscape" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Desert", title: "Sinai Desert", description: "Remote location" }
    ],
    locationDetails: {
      address: "Wadi Gnai, Sinai Desert, South Sinai, Egypt",
      coordinates: { lat: 28.7000, lng: 34.3000 },
      distance: "60 km from Dahab",
      access: "4x4 and hiking required",
      nearby: ["Bedouin villages", "Ancient wells", "Desert wadis", "Date palm groves"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Pickup", description: "Hotel pickup in 4x4", duration: "30 min", icon: "Car" },
      { time: "09:30 AM", title: "Desert Drive", description: "Scenic 4x4 journey", duration: "90 min", icon: "Car" },
      { time: "11:00 AM", title: "Oasis Hiking", description: "Explore palm groves", duration: "90 min", icon: "Mountain" },
      { time: "12:30 PM", title: "Natural Pool", description: "Swim in fresh springs", duration: "60 min", icon: "Waves" },
      { time: "01:30 PM", title: "Bedouin Lunch", description: "Traditional meal", duration: "90 min", icon: "Utensils" },
      { time: "03:00 PM", title: "Return Journey", description: "Scenic return drive", duration: "90 min", icon: "Car" }
    ],
    included: ["Bedouin guide", "4x4 transport", "Hiking", "Lunch", "Tea", "Swimming", "Insurance"],
    notIncluded: ["Personal gear", "Tips", "Extra snacks", "Camping (optional)"],
    activities: [
      { name: "Oasis Hiking", icon: "Mountain", description: "Explore palm groves and springs", difficulty: "Moderate", duration: "3h" },
      { name: "Natural Pool Swimming", icon: "Waves", description: "Swim in freshwater springs", difficulty: "Easy", duration: "1h" },
      { name: "Bedouin Experience", icon: "Shield", description: "Learn traditional life", difficulty: "Easy", duration: "Throughout" },
      { name: "Desert Ecology Tour", icon: "Info", description: "Understand oasis ecosystem", difficulty: "Easy", duration: "1h" }
    ],
    highlights: ["Hidden desert oasis", "Natural freshwater springs", "Lush palm groves", "Traditional Bedouin culture", "Desert ecology", "Remote peaceful setting"],
    reviews: [
      { name: "Lars Hansen", nationality: "Denmark", rating: 5, comment: "Peaceful paradise! The natural pool was refreshing!", date: "Nov 2025", verified: true, helpful: 43 },
      { name: "Nour Mansour", nationality: "Lebanon", rating: 5, comment: "Authentic Bedouin experience. Lunch was incredible!", date: "Oct 2025", verified: true, helpful: 39 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Moderate fitness", icon: "Shield" },
        { text: "Hiking shoes", icon: "AlertCircle" },
        { text: "Min age 10 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Hiking gear", icon: "Backpack" },
        { text: "Swimwear", icon: "Waves" },
        { text: "Towel", icon: "Info" },
        { text: "Sun protection", icon: "Sun" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 13. Nabq National Park 
  {
    id: 13,
    category: "Nature & Wildlife",
    title: "Nabq National Park",
    description: "Discover Egypt's largest coastal protectorate with mangrove forests, diverse ecosystems, and rich wildlife.",
    longDescription: "Nabq National Park is a unique protected area featuring the northernmost mangrove forests in the world, sand dunes, coral reefs, and desert mountains. The park is home to diverse wildlife including gazelles, foxes, and numerous bird species. It offers a perfect combination of coastal and desert ecosystems rarely found together.",
    imageUrl: "",
    href: "/destinations/nabq-park",
    IdPage: "nabq-park",
    subtitle: "Mangrove Paradise",
    badge: "Protected Area",
    rating: "4.7",
    location: "Sharm El Sheikh",
    price: "$55",
    duration: "Half Day (5 hours)",
    groupSize: "Max 12 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Mangroves", title: "Mangrove Forest", description: "Unique ecosystem" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Wildlife", title: "Desert Wildlife", description: "Gazelles and foxes" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Beach", title: "Pristine Beach", description: "Untouched coastline" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Birds", title: "Bird Watching", description: "Migratory species" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Coral", title: "Coral Reefs", description: "Marine biodiversity" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Dunes", title: "Sand Dunes", description: "Desert landscape" }
    ],
    locationDetails: {
      address: "Nabq Protected Area, Sharm El Sheikh, South Sinai, Egypt",
      coordinates: { lat: 28.1667, lng: 34.4500 },
      distance: "30 km from Sharm El Sheikh",
      access: "By organized tour with transport",
      nearby: ["Mangrove forests", "Coral reefs", "Sand dunes", "Desert mountains"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Pickup", description: "Hotel pickup", duration: "30 min", icon: "Car" },
      { time: "09:00 AM", title: "Park Arrival", description: "Entrance and orientation", duration: "15 min", icon: "Info" },
      { time: "09:30 AM", title: "Mangrove Walk", description: "Explore mangrove forests", duration: "90 min", icon: "Mountain" },
      { time: "11:00 AM", title: "Beach Time", description: "Snorkel or relax", duration: "90 min", icon: "Waves" },
      { time: "12:30 PM", title: "Wildlife Tour", description: "Desert ecology walk", duration: "60 min", icon: "Camera" },
      { time: "01:30 PM", title: "Return", description: "Transfer back", duration: "30 min", icon: "Car" }
    ],
    included: ["Expert guide", "Transport", "Park fees", "Snorkel equipment", "Water & snacks", "Insurance"],
    notIncluded: ["Lunch", "Binoculars rental", "Tips"],
    activities: [
      { name: "Mangrove Exploration", icon: "Mountain", description: "Walk through unique forests", difficulty: "Easy", duration: "90 min" },
      { name: "Snorkeling", icon: "Fish", description: "Coral reef exploration", difficulty: "Easy", duration: "90 min" },
      { name: "Wildlife Spotting", icon: "Camera", description: "See gazelles and birds", difficulty: "Easy", duration: "60 min" },
      { name: "Beach Relaxation", icon: "Sun", description: "Pristine beach", difficulty: "Easy", duration: "Flexible" }
    ],
    highlights: ["Northernmost mangroves", "Diverse ecosystems", "Wildlife viewing", "Pristine beaches", "Educational experience", "Family-friendly"],
    reviews: [
      { name: "Jennifer White", nationality: "USA", rating: 5, comment: "Fascinating ecosystem! Kids learned so much!", date: "Oct 2025", verified: true, helpful: 58 },
      { name: "Hassan Ibrahim", nationality: "Egypt", rating: 5, comment: "Beautiful park! Great for nature lovers!", date: "Sep 2025", verified: true, helpful: 51 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Basic fitness", icon: "Shield" },
        { text: "Suitable for all ages", icon: "Check" },
        { text: "Swimming ability (for snorkeling)", icon: "Waves" }
      ],
      whatToBring: [
        { text: "Walking shoes", icon: "Backpack" },
        { text: "Swimwear", icon: "Waves" },
        { text: "Camera/binoculars", icon: "Camera" },
        { text: "Sun protection", icon: "Sun" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },

  // 14. Dolphin House Snorkeling
  {
    id: 14,
    category: "Nature & Wildlife",
    title: "Dolphin House",
    description: "Swim with wild dolphins in their natural habitat at this famous Red Sea reef known for dolphin encounters.",
    longDescription: "Dolphin House (Sha'ab Samadai) is a horseshoe-shaped reef famous for its resident spinner dolphin pod. This protected area offers one of the best opportunities in the world to snorkel with wild dolphins in their natural environment. The reef itself is spectacular with vibrant corals and abundant marine life.",
    imageUrl: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    href: "/destinations/dolphin-house",
    IdPage: "dolphin-house",
    subtitle: "Swim with Dolphins",
    badge: "Wildlife",
    rating: "4.9",
    location: "Red Sea",
    price: "$90",
    duration: "Full Day (8 hours)",
    groupSize: "Max 15 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Dolphins", title: "Wild Dolphins", description: "Spinner dolphins" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Swimming", title: "Dolphin Encounter", description: "Magical experience" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Reef", title: "Beautiful Reef", description: "Horseshoe formation" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Coral", title: "Vibrant Corals", description: "Rich marine life" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Boat", title: "Boat Trip", description: "Comfortable journey" },
      { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1", alt: "Group", title: "Snorkeling", description: "Group experience" }
    ],
    locationDetails: {
      address: "Sha'ab Samadai (Dolphin House), Red Sea, Egypt",
      coordinates: { lat: 25.0167, lng: 34.7333 },
      distance: "45 km from Marsa Alam",
      access: "By boat only from Marsa Alam",
      nearby: ["Protected dolphin habitat", "Coral reef sanctuary"]
    },
    detailedItinerary: [
      { time: "07:00 AM", title: "Pickup", description: "Hotel pickup", duration: "30 min", icon: "Car" },
      { time: "08:00 AM", title: "Boat Departure", description: "Set sail", duration: "90 min", icon: "Waves" },
      { time: "09:30 AM", title: "First Snorkel", description: "Dolphin area", duration: "90 min", icon: "Fish" },
      { time: "11:00 AM", title: "Relaxation", description: "Boat break", duration: "60 min", icon: "Coffee" },
      { time: "12:00 PM", title: "Lunch", description: "Buffet on boat", duration: "60 min", icon: "Utensils" },
      { time: "01:00 PM", title: "Second Snorkel", description: "Reef exploration", duration: "90 min", icon: "Waves" },
      { time: "03:00 PM", title: "Return", description: "Sail back", duration: "90 min", icon: "Waves" },
      { time: "04:30 PM", title: "Hotel Drop-off", description: "Transfer back", duration: "30 min", icon: "Car" }
    ],
    included: ["Marine guide", "Boat transport", "Snorkel equipment", "Life jackets", "Lunch buffet", "Drinks", "Protected area fees", "Insurance"],
    notIncluded: ["Wetsuit rental", "Underwater camera", "Tips", "Hotel transfer (available)"],
    activities: [
      { name: "Dolphin Swimming", icon: "Fish", description: "Swim with wild dolphins", difficulty: "Easy", duration: "Throughout" },
      { name: "Reef Snorkeling", icon: "Waves", description: "Explore coral reef", difficulty: "Easy", duration: "3h total" },
      { name: "Wildlife Watching", icon: "Camera", description: "Observe marine life", difficulty: "Easy", duration: "Throughout" },
      { name: "Boat Cruise", icon: "Waves", description: "Red Sea journey", difficulty: "Easy", duration: "3h" }
    ],
    highlights: ["Wild dolphin encounters", "Resident spinner dolphin pod", "Protected marine area", "Spectacular reef", "Professional guides", "Respectful wildlife viewing"],
    reviews: [
      { name: "Isabella Romano", nationality: "Italy", rating: 5, comment: "Dream come true! Swam with 20+ dolphins!", date: "Oct 2025", verified: true, helpful: 94 },
      { name: "Karim Said", nationality: "Egypt", rating: 5, comment: "Incredible experience! Dolphins were so close!", date: "Sep 2025", verified: true, helpful: 87 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Swimming ability", icon: "Waves" },
        { text: "Min age 8 years", icon: "Info" },
        { text: "Respect wildlife rules", icon: "Shield" }
      ],
      whatToBring: [
        { text: "Swimwear", icon: "Backpack" },
        { text: "Towel", icon: "Info" },
        { text: "Reef-safe sunscreen", icon: "Sun" },
        { text: "Waterproof camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 15. Ras Mohammed Safari
  {
    id: 15,
    category: "Nature & Wildlife",
    title: "Ras Mohammed Marine Safari",
    description: "Comprehensive safari combining diving, snorkeling, and wildlife viewing in Egypt's premier national park.",
    longDescription: "Experience the ultimate Ras Mohammed adventure combining multiple dive sites, snorkeling spots, and land-based wildlife viewing. This comprehensive tour showcases the park's incredible biodiversity both above and below water, including the famous Magic Lake, earthquake crack, and mangrove forests.",
    imageUrl: "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt",
    href: "/destinations/ras-mohammed-safari",
    IdPage: "ras-mohammed-safari",
    subtitle: "Complete Park Experience",
    badge: "Adventure",
    rating: "4.9",
    location: "Ras Mohammed",
    price: "$85",
    duration: "Full Day (9 hours)",
    groupSize: "Max 18 people",
    difficulty: "Easy to Moderate",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2020/10/five-places-to-dive-egypt-coral-reef-shutterstock-1020.jpg?itok=qNzsD_Tt", alt: "Marine life", title: "Rich Biodiversity", description: "Incredible wildlife" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Magic Lake", title: "Magic Lake", description: "Unique salt lake" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Mangroves", title: "Mangrove Channel", description: "Rare ecosystem" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Wildlife", title: "Desert Wildlife", description: "Foxes and birds" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Snorkeling", title: "Snorkeling", description: "Crystal waters" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Landscape", title: "Park Views", description: "Stunning scenery" }
    ],
    locationDetails: {
      address: "Ras Mohammed National Park, South Sinai, Egypt",
      coordinates: { lat: 27.7319, lng: 34.2354 },
      distance: "12 km from Sharm El Sheikh",
      access: "Organized tour with transport",
      nearby: ["Magic Lake", "Earthquake Crack", "Mangrove Channel", "Visitors Center"]
    },
    detailedItinerary: [
      { time: "07:00 AM", title: "Pickup", description: "Hotel collection", duration: "30 min", icon: "Car" },
      { time: "08:00 AM", title: "Park Entrance", description: "Orientation", duration: "15 min", icon: "Info" },
      { time: "08:30 AM", title: "Magic Lake", description: "Salt lake visit", duration: "30 min", icon: "Camera" },
      { time: "09:00 AM", title: "First Snorkel", description: "Coral reef", duration: "90 min", icon: "Fish" },
      { time: "11:00 AM", title: "Mangroves", description: "Mangrove channel walk", duration: "45 min", icon: "Mountain" },
      { time: "12:00 PM", title: "Lunch", description: "Park restaurant", duration: "60 min", icon: "Utensils" },
      { time: "01:00 PM", title: "Second Snorkel", description: "Different site", duration: "90 min", icon: "Waves" },
      { time: "03:00 PM", title: "Wildlife Tour", description: "Desert ecology", duration: "60 min", icon: "Camera" },
      { time: "04:00 PM", title: "Return", description: "Transfer back", duration: "30 min", icon: "Car" }
    ],
    included: ["Expert guide", "Transport", "Park fees", "Snorkel equipment", "Lunch", "Drinks", "Wildlife tour", "Insurance"],
    notIncluded: ["Wetsuit", "Underwater camera", "Tips"],
    activities: [
      { name: "Snorkeling", icon: "Fish", description: "Multiple reef sites", difficulty: "Easy", duration: "3h" },
      { name: "Magic Lake Visit", icon: "Camera", description: "Unique salt lake", difficulty: "Easy", duration: "30 min" },
      { name: "Mangrove Walk", icon: "Mountain", description: "Mangrove ecosystem", difficulty: "Easy", duration: "45 min" },
      { name: "Wildlife Safari", icon: "Camera", description: "Desert animals", difficulty: "Easy", duration: "60 min" }
    ],
    highlights: ["Complete park experience", "Multiple snorkel sites", "Magic Lake", "Mangrove forests", "Wildlife viewing", "Educational tour"],
    reviews: [
      { name: "David Thompson", nationality: "UK", rating: 5, comment: "Best value tour! Saw everything in one day!", date: "Oct 2025", verified: true, helpful: 82 },
      { name: "Layla Mahmoud", nationality: "Egypt", rating: 5, comment: "Comprehensive and well-organized! Highly recommended!", date: "Sep 2025", verified: true, helpful: 76 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Swimming ability", icon: "Waves" },
        { text: "Basic fitness", icon: "Shield" },
        { text: "All ages welcome", icon: "Check" }
      ],
      whatToBring: [
        { text: "Swimwear & walking shoes", icon: "Backpack" },
        { text: "Towel", icon: "Info" },
        { text: "Sunscreen", icon: "Sun" },
        { text: "Camera", icon: "Camera" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // ==================== Cultural & Historical Category (5) ====================

  // 16. St. Catherine's Monastery 
  {
    id: 16,
    category: "Cultural & Historical",
    title: "St. Catherine's Monastery",
    description: "One of the world's oldest working Christian monasteries, a UNESCO World Heritage Site with incredible religious history.",
    longDescription: "Founded in the 6th century by Byzantine Emperor Justinian I, St. Catherine's Monastery sits at the foot of Mount Sinai. It houses an incredible collection of religious manuscripts second only to the Vatican, priceless icons, and religious artifacts. The monastery is built around what is believed to be the burning bush from which God spoke to Moses.",
    imageUrl: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg",
    href: "/destinations/st-catherines",
    IdPage: "st-catherines",
    subtitle: "UNESCO World Heritage Site",
    badge: "Historical",
    rating: "4.9",
    location: "Saint Katherine, Sinai",
    price: "$40",
    duration: "Half Day (4 hours)",
    groupSize: "Max 20 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Monastery", title: "Ancient Monastery", description: "6th century architecture" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Icons", title: "Religious Art", description: "Priceless icon collection" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Burning Bush", title: "Burning Bush", description: "Biblical site" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Library", title: "Ancient Library", description: "Rare manuscripts" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Chapel", title: "Chapel Interior", description: "Byzantine art" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Walls", title: "Fortress Walls", description: "Historic fortifications" }
    ],
    locationDetails: {
      address: "St. Catherine's Monastery, Saint Katherine, South Sinai, Egypt",
      coordinates: { lat: 28.5560, lng: 33.9756 },
      distance: "140 km from Dahab",
      access: "Organized tours only",
      nearby: ["Mount Sinai (2km)", "Moses' Spring (1km)", "Burning Bush", "Monastery garden"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Pickup", description: "Hotel pickup", duration: "Varies", icon: "Car" },
      { time: "10:30 AM", title: "Arrival", description: "Arrive at monastery", duration: "15 min", icon: "MapPin" },
      { time: "11:00 AM", title: "Guided Tour", description: "Expert monastery tour", duration: "90 min", icon: "Camera" },
      { time: "12:30 PM", title: "Museum Visit", description: "Icon and artifact collection", duration: "45 min", icon: "Info" },
      { time: "01:15 PM", title: "Free Time", description: "Explore gardens", duration: "30 min", icon: "Sun" },
      { time: "02:00 PM", title: "Return", description: "Transfer back", duration: "2.5h", icon: "Car" }
    ],
    included: ["Expert guide", "Transport", "Entrance fees", "Monastery tour", "Museum access", "Insurance"],
    notIncluded: ["Lunch", "Souvenirs", "Tips", "Photography permit (inside)"],
    activities: [
      { name: "Monastery Tour", icon: "Camera", description: "6th century architecture", difficulty: "Easy", duration: "90 min" },
      { name: "Museum Visit", icon: "Info", description: "Religious artifacts", difficulty: "Easy", duration: "45 min" },
      { name: "Burning Bush", icon: "Shield", description: "Biblical burning bush site", difficulty: "Easy", duration: "20 min" },
      { name: "Icon Gallery", icon: "Camera", description: "Priceless icon collection", difficulty: "Easy", duration: "30 min" }
    ],
    highlights: ["UNESCO World Heritage Site", "6th century monastery", "Burning Bush site", "Ancient manuscripts", "Byzantine icons", "Historic library"],
    reviews: [
      { name: "Robert Miller", nationality: "USA", rating: 5, comment: "Incredible history! The guide was so knowledgeable!", date: "Oct 2025", verified: true, helpful: 89 },
      { name: "Anna Ivanova", nationality: "Russia", rating: 5, comment: "Deeply moving religious site. Icon collection is priceless!", date: "Sep 2025", verified: true, helpful: 76 }
    ],
    practicalInfo: {
      requirements: [
        { text: "Modest dress code", icon: "Info" },
        { text: "Shoulders & knees covered", icon: "AlertCircle" },
        { text: "Closed shoes", icon: "Info" }
      ],
      whatToBring: [
        { text: "Modest clothing", icon: "Backpack" },
        { text: "Camera (no flash)", icon: "Camera" },
        { text: "Hat for sun", icon: "Sun" },
        { text: "Small bag only", icon: "Backpack" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  },



];

// Context Provider Code 
const DestinationsContext = createContext(undefined);

export function DestinationsProvider({ children }) {
  const [destinations, setDestinations] = useState(destinationsInitialData);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getDestinationById = (idPage) => {
    return destinations.find(dest => dest.IdPage === idPage);
  };

  const getDestinationByNumericId = (id) => {
    return destinations.find(dest => dest.id === id);
  };

  const getDestinationsByCategory = (category) => {
    return destinations.filter(dest => dest.category === category);
  };

  const getAllCategories = () => {
    const categories = [...new Set(destinations.map(dest => dest.category))];
    return categories;
  };

  const searchDestinations = (query) => {
    if (!query) return destinations;
    const lowerQuery = query.toLowerCase();
    return destinations.filter(dest => 
      dest.title.toLowerCase().includes(lowerQuery) ||
      dest.description.toLowerCase().includes(lowerQuery) ||
      dest.location.toLowerCase().includes(lowerQuery) ||
      dest.category.toLowerCase().includes(lowerQuery)
    );
  };

  const toggleFavorite = (destinationId) => {
    setFavorites(prev => {
      if (prev.includes(destinationId)) {
        return prev.filter(id => id !== destinationId);
      } else {
        return [...prev, destinationId];
      }
    });
  };

  const isFavorite = (destinationId) => {
    return favorites.includes(destinationId);
  };

  const filterByPrice = (maxPrice) => {
    return destinations.filter(dest => {
      const price = parseInt(dest.price.replace('$', ''));
      return price <= maxPrice;
    });
  };

  const filterByRating = (minRating) => {
    return destinations.filter(dest => parseFloat(dest.rating) >= minRating);
  };

  const contextValue = useMemo(() => ({
    destinations,
    favorites,
    searchQuery,
    setSearchQuery,
    getDestinationById,
    getDestinationByNumericId,
    getDestinationsByCategory,
    getAllCategories,
    searchDestinations,
    toggleFavorite,
    isFavorite,
    filterByPrice,
    filterByRating,
    setDestinations
  }), [destinations, favorites, searchQuery]);

  return (
    <DestinationsContext.Provider value={contextValue}>
      {children}
    </DestinationsContext.Provider>
  );
}

export function useDestinations() {
  const context = useContext(DestinationsContext);
  if (context === undefined) {
    throw new Error('useDestinations must be used within a DestinationsProvider');
  }
  return context;
}

export default DestinationsContext;



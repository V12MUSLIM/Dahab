
"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';

const destinationsInitialData = [
  // 1. Blue Hole
  {
    id: 1,
    title: "Blue Hole",
    description: "World-famous diving spot with crystal clear water and vibrant marine life, offering unparalleled underwater experiences for divers of all levels.",
    longDescription: "The Blue Hole in Dahab is a legendary dive site that has captured the imagination of divers worldwide. This natural submarine sinkhole plunges to depths of over 130 meters, creating a mesmerizing vertical shaft through the reef. The site features stunning coral walls, diverse marine ecosystems, and the famous archway tunnel at 55 meters depth. Whether you're a recreational diver exploring the shallow sections or a technical diver venturing into the depths, the Blue Hole offers an unforgettable underwater experience with visibility often exceeding 40 meters.",
    imageUrl: "https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k04f33ff8/directory/profile/photo/1191854.jpg",
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
      { src: "https://wallpapers.com/images/hd/great-blue-hole-near-belize-m26ctlqphttps://thewatermarkbelize.com/wp-content/uploads/2024/01/Aerial-view-of-the-Blue-Hole-Belize-from-a-Watermark-Belize-Hotel-tour.webpl0ce8o45.jpg", alt: "Blue Hole aerial view", title: "Iconic Blue Hole", description: "Aerial view of famous diving spot" },
      { src: "https://www.scubadiving.com/sites/scubadiving.com/files/styles/655_1x_/public/images/2023/02/blue-hole-dahab-egypt.jpg", alt: "Underwater view", title: "Underwater Paradise", description: "Crystal clear waters" },
      { src: "https://media.istockphoto.com/id/464305697/photo/scuba-diver-swims-through-tunnel.jpg?s=612x612&w=0&k=20&c=Qmhf5la_WyDXYbhIyYeo7RkVkNdFYPD4eBsSl7c_GMA=", alt: "Diving at Blue Hole", title: "Professional Diving", description: "Expert instructors" },
      { src: "https://www.shutterstock.com/image-photo/aerial-top-view-famous-deans-600nw-2222403843.jpg", alt: "Coral reef", title: "Vibrant Corals", description: "Rich marine ecosystem" },
      { src: "https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k04f33ff8/directory/profile/photo/1191854.jpg", alt: "Beach view", title: "Beach Setting", description: "Relaxing atmosphere" },
      { src: "https://lh3.ggpht.com/-JzWg6iaoXBQ/Uw3ZkyPKy0I/AAAAAAAAwXE/pss_2vyEycM/deans-blue-hole-9%25255B6%25255D.jpg?imgmax=800", alt: "The Archway", title: "Famous Archway", description: "55-meter challenge" }
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

  // 2. Mount Sinai
  {
    id: 2,
    title: "Mount Sinai",
    description: "Sacred mountain with breathtaking sunrise views and deep historical significance for Judaism, Christianity, and Islam.",
    longDescription: "Mount Sinai, also known as Jebel Musa, stands at 2,285 meters. According to biblical tradition, this is where Moses received the Ten Commandments. The journey combines spiritual reflection with physical challenge, rewarding climbers with one of the most spectacular sunrises in the world. At the base lies St. Catherine's Monastery, a UNESCO World Heritage Site and one of the oldest continuously operating Christian monasteries.",
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

  // 3. Colored Canyon
  {
    id: 3,
    title: "Colored Canyon",
    description: "Hike through spectacular multicolored rock formations showcasing nature's artistry over millions of years.",
    longDescription: "The Colored Canyon features narrow passages through walls painted in brilliant shades of red, orange, yellow, purple, and white. Created by millions of years of erosion, this 800-meter natural cathedral showcases incredible geological forces. The interplay of light on sandstone creates a photographer's paradise, with some sections so narrow you can touch both walls.",
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

  // 4. Dahab Lagoon
  {
    id: 4,
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

  // 5. Abu Galum
  {
    id: 5,
    title: "Abu Galum",
    description: "Stunning protectorate where desert meets sea, offering pristine coral reefs and authentic Bedouin culture.",
    longDescription: "Abu Galum is a protected area featuring unique landscapes where Sinai mountains meet the Red Sea. Accessible only by camel, boat, or hiking, this remote paradise offers world-class snorkeling, untouched beaches, and authentic Bedouin experiences. The protectorate is home to diverse wildlife including Nubian ibex, and its coral reefs are among the most pristine in the Red Sea.",
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

  // 6. St. Catherine's Monastery
  {
    id: 6,
    title: "St. Catherine's Monastery",
    description: "One of the world's oldest working Christian monasteries, a UNESCO World Heritage Site with incredible history and religious significance.",
    longDescription: "Founded in the 6th century by Byzantine Emperor Justinian I, St. Catherine's Monastery sits at the foot of Mount Sinai. It houses an incredible collection of religious manuscripts second only to the Vatican, priceless icons, and religious artifacts. The monastery is built around what is believed to be the burning bush from which God spoke to Moses. Its library contains the world's oldest continually operating library with manuscripts in Greek, Arabic, Armenian, Coptic, and other languages.",
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

  // 7. Three Pools Snorkeling
  {
    id: 7,
    title: "Three Pools Snorkeling",
    description: "Hidden gem featuring three natural lagoons with incredible coral gardens and abundant colorful marine life.",
    longDescription: "Three Pools is one of Dahab's best-kept secrets for snorkeling. These natural lagoons feature pristine coral reefs, crystal clear water, and an abundance of tropical fish. The three pools are formed by natural rock formations creating sheltered areas perfect for snorkeling. Accessible by a scenic coastal walk or boat, it's ideal for families and snorkeling enthusiasts. The shallow depths and calm waters make it perfect for beginners while the diversity of marine life keeps experienced snorkelers engaged.",
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

  // 8. Wadi Gnai Oasis
  {
    id: 8,
    title: "Wadi Gnai Oasis",
    description: "Explore a hidden desert oasis with natural freshwater springs, lush palm groves, and ancient Bedouin settlements.",
    longDescription: "Wadi Gnai is a secluded oasis in the heart of the Sinai Desert, featuring natural freshwater springs, lush palm groves, and traditional Bedouin life unchanged for centuries. This peaceful retreat offers a unique glimpse into desert ecology and Bedouin culture. The oasis is fed by underground springs creating a green haven in the arid landscape. Visitors can swim in natural pools, explore ancient water channels, and enjoy traditional Bedouin hospitality.",
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

  // 9. Ras Abu Galum Safari
  {
    id: 9,
    title: "Ras Abu Galum Safari",
    description: "Thrilling 4x4 desert safari through stunning Sinai landscapes, combining adventure with breathtaking natural beauty.",
    longDescription: "Experience the raw beauty of the Sinai Desert on an exciting 4x4 safari adventure. Journey through wadis, over dunes, and along coastal tracks to reach remote locations inaccessible by regular vehicles. Visit traditional Bedouin settlements, enjoy authentic hospitality, and witness spectacular desert sunsets. This safari combines adrenaline-pumping off-road driving with cultural immersion and natural wonders.",
    imageUrl: "https://www.youregypttours.com/storage/1208/1681127279.jpg",
    href: "/destinations/desert-safari",
    IdPage: "desert-safari",
    subtitle: "4x4 Desert Adventure",
    badge: "Thrilling",
    rating: "4.7",
    location: "Sinai Desert",
    price: "$75",
    duration: "Full Day (8 hours)",
    groupSize: "Max 6 per vehicle",
    difficulty: "Easy",
    bestTime: "October to May",
    galleryImages: [
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Safari", title: "Desert Adventure", description: "Thrilling 4x4 ride" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Dunes", title: "Sand Dunes", description: "Spectacular landscapes" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Bedouin", title: "Bedouin Visit", description: "Cultural experience" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Sunset", title: "Desert Sunset", description: "Breathtaking views" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Mountains", title: "Mountain Valleys", description: "Dramatic terrain" },
      { src: "https://www.tripsinegypt.com/wp-content/uploads/2023/10/camel-looking-out-at-mount-sinai-in-egypt-trips-in-egypt.jpg", alt: "Camp", title: "Desert Camp", description: "Traditional setting" }
    ],
    locationDetails: {
      address: "Sinai Desert, South Sinai, Egypt",
      coordinates: { lat: 28.8000, lng: 34.4000 },
      distance: "Starts from Dahab",
      access: "4x4 vehicles only",
      nearby: ["Bedouin villages", "Desert oases", "Sand dunes", "Mountain wadis"]
    },
    detailedItinerary: [
      { time: "08:00 AM", title: "Pickup", description: "Hotel pickup in 4x4", duration: "15 min", icon: "Car" },
      { time: "09:00 AM", title: "Desert Driving", description: "Exciting off-road adventure", duration: "2h", icon: "Car" },
      { time: "11:00 AM", title: "Bedouin Village", description: "Visit traditional settlement", duration: "90 min", icon: "MapPin" },
      { time: "12:30 PM", title: "Lunch", description: "Traditional Bedouin lunch", duration: "90 min", icon: "Utensils" },
      { time: "02:00 PM", title: "Exploration", description: "Explore desert sites", duration: "2h", icon: "Mountain" },
      { time: "04:00 PM", title: "Sunset View", description: "Watch desert sunset", duration: "60 min", icon: "Sunrise" },
      { time: "05:00 PM", title: "Return", description: "Return to Dahab", duration: "90 min", icon: "Car" }
    ],
    included: ["Expert driver", "4x4 vehicle", "Bedouin lunch", "Tea ceremony", "Insurance", "Photos", "Hotel transfer"],
    notIncluded: ["Extra drinks", "Tips", "Personal expenses", "Souvenirs"],
    activities: [
      { name: "4x4 Driving", icon: "Car", description: "Exciting desert drive", difficulty: "Easy", duration: "4h" },
      { name: "Bedouin Visit", icon: "Shield", description: "Cultural experience", difficulty: "Easy", duration: "2h" },
      { name: "Desert Exploration", icon: "Mountain", description: "Discover remote sites", difficulty: "Easy", duration: "2h" },
      { name: "Sunset Viewing", icon: "Sunrise", description: "Spectacular sunset", difficulty: "Easy", duration: "1h" }
    ],
    highlights: ["Thrilling 4x4 adventure", "Remote desert locations", "Bedouin culture", "Spectacular sunset views", "Traditional lunch", "Professional driver"],
    reviews: [
      { name: "Michael Brown", nationality: "Australia", rating: 5, comment: "Amazing adventure! Driver was skilled and landscapes stunning!", date: "Nov 2025", verified: true, helpful: 64 },
      { name: "Elena Popov", nationality: "Ukraine", rating: 5, comment: "Best desert safari! Bedouin hospitality was wonderful!", date: "Oct 2025", verified: true, helpful: 56 }
    ],
    practicalInfo: {
      requirements: [
        { text: "No special skills needed", icon: "Info" },
        { text: "Suitable for all ages", icon: "Check" },
        { text: "Min age 5 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Sunglasses", icon: "Sun" },
        { text: "Camera", icon: "Camera" },
        { text: "Scarf for dust", icon: "Backpack" },
        { text: "Comfortable clothes", icon: "Info" }
      ],
      cancellation: "Free cancellation 48h before"
    }
  },

  // 10. Dahab Yoga & Wellness Retreat
  {
    id: 10,
    title: "Dahab Yoga & Wellness Retreat",
    description: "Combine yoga, meditation, and Red Sea relaxation in a holistic wellness experience for body, mind, and spirit.",
    longDescription: "Experience ultimate relaxation with daily yoga sessions on the beach, guided meditation overlooking the Red Sea, healthy organic meals, and optional spa treatments. Set against the stunning backdrop of Dahab's mountains and turquoise waters, this retreat offers the perfect escape. Led by experienced yoga instructors, the program includes various styles from Hatha to Vinyasa, suitable for all levels. Complement your practice with traditional wellness treatments and nutritious cuisine.",
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1",
    href: "/destinations/yoga-retreat",
    IdPage: "yoga-retreat",
    subtitle: "Wellness & Relaxation",
    badge: "Wellness",
    rating: "4.9",
    location: "Dahab Beach",
    price: "$80",
    duration: "Full Day (8 hours)",
    groupSize: "Max 15 people",
    difficulty: "Easy",
    bestTime: "Year-round",
    galleryImages: [
      { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511701167.jpg?k=c515cafbb679765be30f57f6da71539f014838d33a25dd29c45a0c1de534ec12&o=&hp=1", alt: "Yoga", title: "Beach Yoga", description: "Morning sessions" },
      { src: "https://www.propertyfinder.eg/blog/wp-content/uploads/2019/10/blue-hole-dahab-800x600.jpg", alt: "Meditation", title: "Meditation", description: "Peaceful setting" },
      { src: "https://www.arabtravelers.com/wp-content/uploads/2023/05/Tourism-in-dahab-10.jpg", alt: "Spa", title: "Wellness Spa", description: "Relaxing treatments" },
      { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1", alt: "Beach", title: "Beachfront", description: "Stunning location" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n29sm6e6Hgu-Yb_VLT1kWn8w1q1jRbJJXQ&s", alt: "Food", title: "Healthy Meals", description: "Nutritious cuisine" },
      { src: "https://www.youregypttours.com/storage/1208/1681127279.jpg", alt: "Sunset", title: "Sunset Yoga", description: "Evening practice" }
    ],
    locationDetails: {
      address: "Dahab Beach, South Sinai, Egypt",
      coordinates: { lat: 28.4942, lng: 34.5098 },
      distance: "Dahab seafront",
      access: "Easy beach access",
      nearby: ["Wellness centers", "Spa facilities", "Healthy cafes", "Beach clubs"]
    },
    detailedItinerary: [
      { time: "07:00 AM", title: "Morning Yoga", description: "Beach yoga session", duration: "90 min", icon: "Sun" },
      { time: "09:00 AM", title: "Breakfast", description: "Healthy organic breakfast", duration: "60 min", icon: "Utensils" },
      { time: "10:30 AM", title: "Meditation", description: "Guided meditation", duration: "60 min", icon: "Shield" },
      { time: "12:00 PM", title: "Free Time", description: "Beach relaxation or spa", duration: "2h", icon: "Waves" },
      { time: "02:00 PM", title: "Lunch", description: "Nutritious lunch", duration: "60 min", icon: "Utensils" },
      { time: "04:00 PM", title: "Afternoon Session", description: "Restorative yoga", duration: "90 min", icon: "Sun" },
      { time: "06:00 PM", title: "Tea Ceremony", description: "Herbal tea and reflection", duration: "30 min", icon: "Coffee" }
    ],
    included: ["Professional instructor", "Beach yoga sessions", "Meditation", "Healthy lunch", "Tea ceremony", "Spa access", "Yoga mat"],
    notIncluded: ["Spa treatments (optional)", "Dinner", "Personal yoga mat", "Tips"],
    activities: [
      { name: "Beach Yoga", icon: "Sun", description: "Morning & evening sessions", difficulty: "Easy", duration: "3h total" },
      { name: "Meditation", icon: "Shield", description: "Guided mindfulness", difficulty: "Easy", duration: "1h" },
      { name: "Spa Treatments", icon: "Waves", description: "Optional wellness treatments", difficulty: "Easy", duration: "Varies" },
      { name: "Healthy Meals", icon: "Utensils", description: "Organic nutritious food", difficulty: "Easy", duration: "Throughout" }
    ],
    highlights: ["Professional yoga instructor", "Stunning beach location", "Holistic wellness approach", "Healthy organic meals", "Meditation practice", "Optional spa treatments"],
    reviews: [
      { name: "Jennifer Lee", nationality: "Canada", rating: 5, comment: "Pure bliss! Instructor was amazing and setting perfect!", date: "Oct 2025", verified: true, helpful: 78 },
      { name: "Amira Said", nationality: "Egypt", rating: 5, comment: "Best wellness retreat! Feel completely refreshed!", date: "Sep 2025", verified: true, helpful: 65 }
    ],
    practicalInfo: {
      requirements: [
        { text: "All levels welcome", icon: "Info" },
        { text: "No experience needed", icon: "Check" },
        { text: "Min age 16 years", icon: "Info" }
      ],
      whatToBring: [
        { text: "Comfortable yoga clothes", icon: "Backpack" },
        { text: "Water bottle", icon: "Info" },
        { text: "Towel", icon: "Info" },
        { text: "Sunscreen", icon: "Sun" }
      ],
      cancellation: "Free cancellation 24h before"
    }
  }
];

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

  const searchDestinations = (query) => {
    if (!query) return destinations;
    const lowerQuery = query.toLowerCase();
    return destinations.filter(dest => 
      dest.title.toLowerCase().includes(lowerQuery) ||
      dest.description.toLowerCase().includes(lowerQuery) ||
      dest.location.toLowerCase().includes(lowerQuery)
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

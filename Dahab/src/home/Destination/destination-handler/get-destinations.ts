import { RequestHandler } from "express";
import { Destination } from "../destination-model";



/*{
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
  } */







export const getDestination:RequestHandler<{},{},{}> =async(req,res)=>{
    const destinations=await Destination.find().
    select("-_id -__v");
    res.json(destinations);
}
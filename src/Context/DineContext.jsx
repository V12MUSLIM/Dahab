import { createContext, useContext } from "react";

export const DineContext = createContext();

export const DineProvider = ({ children }) => {
   const categories = [
    "All",
    "Beachfront Dining",
    "Local Egyptian Food",
    "International Cuisine",
    "Fresh Seafood",
    "Cafés & Bakeries",
    "Rooftop & Lounges"
  ];
 const restaurants = [
    {
      id: 1,
      title: "Blue Beach Restaurant",
      category: "Beachfront Dining",
      subtitle: "Mediterranean Cuisine",
      description: "Fresh seafood and Mediterranean dishes with stunning Red Sea views. Enjoy dining with your feet in the sand.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
      badge: "Popular",
      priceValue: 75,
      rating: "4.8",
      location: "Dahab Beachfront",
      price: "$25-40",
      buttonText: "View Menu",
      href: "/restaurants/blue-beach"
    },
    {
      id: 2,
      title: "Bedouin Tent Restaurant",
      category: "Local Egyptian Food",
      subtitle: "Traditional Egyptian",
      description: "Authentic Bedouin dining experience under traditional tents with live music and stargazing.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
      badge: "Must Try",
      priceValue: 45,
      rating: "4.9",
      location: "Desert Camp, 15km from Dahab",
      price: "$15-25",
      buttonText: "Reserve Table",
      href: "/restaurants/bedouin-tent"
    },
    {
      id: 3,
      title: "Lighthouse Café",
      category: "Cafés & Bakeries",
      subtitle: "Café & Bakery",
      description: "Cozy café serving specialty coffee, fresh pastries, and healthy breakfast options with sea views.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      badge: "Breakfast",
      priceValue: 25,
      rating: "4.6",
      location: "Dahab Lighthouse",
      price: "$8-15",
      buttonText: "Visit Café",
      href: "/restaurants/lighthouse-cafe"
    },
    {
      id: 4,
      title: "Sunset Rooftop Lounge",
      category: "Rooftop & Lounges",
      subtitle: "International Fusion",
      description: "Trendy rooftop bar with panoramic views, creative cocktails, and fusion cuisine perfect for sunset.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
      badge: "Sunset Views",
      priceValue: 85,
      rating: "4.7",
      location: "Dahab City Center",
      price: "$20-35",
      buttonText: "Book Table",
      href: "/restaurants/sunset-rooftop"
    },
    {
      id: 5,
      title: "Diver's Den Seafood",
      category: "Fresh Seafood",
      subtitle: "Fresh Seafood",
      description: "Famous among divers for fresh catch of the day and hearty portions. Casual beachfront atmosphere.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
      badge: "Fresh Daily",
      priceValue: 55,
      rating: "4.8",
      location: "Lagoon Beach",
      price: "$18-30",
      buttonText: "See Menu",
      href: "/restaurants/divers-den"
    },
    {
      id: 6,
      title: "Bella Italia",
      category: "International Cuisine",
      subtitle: "Authentic Italian",
      description: "Authentic Italian restaurant with homemade pasta, wood-fired pizza, and extensive wine list.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2532&auto=format&fit=crop",
      badge: "Romantic",
      priceValue: 60,
      rating: "4.7",
      location: "Mashraba Street",
      price: "$15-28",
      buttonText: "Reserve Now",
      href: "/restaurants/bella-italia"
    }
  ];

  return (
    <DineContext.Provider value={{ restaurants ,categories}}>
      {children}
    </DineContext.Provider>
  );
};


export const useDine = () => {
  return useContext(DineContext);
};

export default DineProvider;

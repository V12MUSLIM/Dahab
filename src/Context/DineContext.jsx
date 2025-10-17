import { createContext, useContext } from "react";

export const DineContext = createContext();

export const DineProvider = ({ children }) => {
  const categories = [
    "All",
    "Seafood Restaurants",
    "Egyptian & Oriental",
    "Syrian & Levantine",
    "Cafés & Bakeries",
    "Italian",
    "Asian & Sushi",
  ];

  const restaurants = [
    // ==================== Seafood Restaurants ====================
    {
      id: 1,
      IdPage: "prawn-house",
      title: "Prawn House Seafood Restaurant",
      category: "Seafood Restaurants",
      subtitle: "Fresh Sea Food",
      description:
        "Located on Al Fanar street, famous for fresh fish, reasonable prices and excellent service.",
      image: "Dine-Images/Prawn House Seafood Restaurant.webp",
      badge: "Fresh & Tasty",
      priceValue: 70,
      rating: "4.9",
      location: "Al Fanar Street, Sharm El Sheikh",
      price: "$25-45",
      buttonText: "View Menu",
      href: "/restaurants/prawn-house",
      // Details
      phone: "+20 69 360 0123",
      email: "info@prawnhouse-dahab.com",
      website: "https://prawnhouse-dahab.com",
      openingHours: {
        monday: "11:00 AM - 11:00 PM",
        tuesday: "11:00 AM - 11:00 PM",
        wednesday: "11:00 AM - 11:00 PM",
        thursday: "11:00 AM - 11:00 PM",
        friday: "11:00 AM - 12:00 AM",
        saturday: "11:00 AM - 12:00 AM",
        sunday: "11:00 AM - 11:00 PM",
      },
      menu: [
        {
          name: "Grilled Prawns",
          price: "$22",
          description: "Fresh jumbo prawns grilled with herbs and lemon",
        },
        {
          name: "Seafood Platter",
          price: "$35",
          description: "Mixed seafood with calamari, prawns, and fish",
        },
        {
          name: "Fish & Chips",
          price: "$18",
          description: "Crispy fried fish with homemade tartar sauce",
        },
        {
          name: "Seafood Pasta",
          price: "$20",
          description: "Fresh pasta with mixed seafood in tomato sauce",
        },
      ],
      features: [
        "Fresh Daily Catch",
        "Outdoor Seating",
        "Sea Views",
        "Family Friendly",
        "Parking Available",
        "WiFi",
      ],
      gallery: [
        {
          src: "Dine-Images/Prawn House Seafood Restaurant.webp",
          alt: "Restaurant exterior",
          title: "Prawn House",
          description: "Fresh seafood daily",
        },
      ],
      reviews: [
        {
          name: "John Smith",
          rating: 5,
          comment: "Best prawns I've ever had! Fresh and delicious.",
          date: "October 14, 2025",
        },
        {
          name: "Sara Ahmed",
          rating: 5,
          comment: "Amazing seafood and great service!",
          date: "October 10, 2025",
        },
      ],
    },
    {
      id: 2,
      IdPage: "shark-restaurant",
      title: "Shark Restaurant",
      category: "Seafood Restaurants",
      subtitle: "Seafood & Grilled Fish",
      description:
        "Located at Masbat Bay waterfront, known for grilled fish and diverse mid-range options.",
      image: "Dine-Images/Shark Restaurant.webp",
      badge: "Seafood Specialist",
      priceValue: 60,
      rating: "4.7",
      location: "Masbat Bay, Sharm El Sheikh",
      price: "$20-40",
      buttonText: "Book a Table",
      href: "/restaurants/shark-restaurant",
      // Details
      phone: "+20 69 360 0456",
      email: "info@sharkrestaurant.com",
      website: "https://sharkrestaurant.com",
      openingHours: {
        monday: "12:00 PM - 11:00 PM",
        tuesday: "12:00 PM - 11:00 PM",
        wednesday: "12:00 PM - 11:00 PM",
        thursday: "12:00 PM - 11:00 PM",
        friday: "12:00 PM - 12:00 AM",
        saturday: "12:00 PM - 12:00 AM",
        sunday: "12:00 PM - 11:00 PM",
      },
      menu: [
        {
          name: "Grilled Red Sea Fish",
          price: "$25",
          description: "Fresh catch grilled to perfection",
        },
        {
          name: "Calamari Rings",
          price: "$15",
          description: "Crispy fried calamari with marinara sauce",
        },
        {
          name: "Seafood Soup",
          price: "$12",
          description: "Rich seafood soup with fresh herbs",
        },
      ],
      features: [
        "Waterfront Dining",
        "Fresh Fish Daily",
        "Live Music",
        "Sunset Views",
        "Bar Available",
      ],
      gallery: [
        {
          src: "Dine-Images/Shark Restaurant.webp",
          alt: "Restaurant",
          title: "Shark Restaurant",
          description: "Waterfront dining",
        },
      ],
      reviews: [
        {
          name: "Mike Johnson",
          rating: 5,
          comment: "Fantastic grilled fish!",
          date: "October 12, 2025",
        },
      ],
    },
    {
      id: 3,
      IdPage: "al-manar",
      title: "Al Manar Restaurant",
      category: "Seafood Restaurants",
      subtitle: "Local Seafood",
      description:
        "At Masbat, offering fresh fish dishes with spectacular Red Sea views.",
      image: "Dine-Images/Al Manar Restaurant.webp",
      badge: "Top Pick",
      priceValue: 50,
      rating: "4.8",
      location: "Masbat, Dahab",
      price: "$15-35",
      buttonText: "Visit Restaurant",
      href: "/restaurants/al-manar",
      // Details
      phone: "+20 69 360 0789",
      email: "info@almanar-dahab.com",
      website: "https://almanar-dahab.com",
      openingHours: {
        monday: "10:00 AM - 10:00 PM",
        tuesday: "10:00 AM - 10:00 PM",
        wednesday: "10:00 AM - 10:00 PM",
        thursday: "10:00 AM - 10:00 PM",
        friday: "10:00 AM - 11:00 PM",
        saturday: "10:00 AM - 11:00 PM",
        sunday: "10:00 AM - 10:00 PM",
      },
      menu: [
        {
          name: "Mixed Grill Seafood",
          price: "$28",
          description: "Variety of grilled seafood",
        },
        {
          name: "Shrimp Scampi",
          price: "$20",
          description: "Garlic butter shrimp with rice",
        },
      ],
      features: ["Red Sea Views", "Fresh Seafood", "Family Friendly"],
      gallery: [
        {
          src: "Dine-Images/Al Manar Restaurant.webp",
          alt: "Restaurant",
          title: "Al Manar",
          description: "Fresh seafood",
        },
      ],
      reviews: [
        {
          name: "Emma Wilson",
          rating: 5,
          comment: "Amazing views and delicious food!",
          date: "October 8, 2025",
        },
      ],
    },

    // ==================== Egyptian & Oriental ====================
    {
      id: 4,
      IdPage: "king-chicken",
      title: "King Chicken",
      category: "Egyptian & Oriental",
      subtitle: "Egyptian Traditional",
      description:
        "Offering popular Egyptian dishes: grills, stuffed vegetables, homemade specialties.",
      image: "Dine-Images/King Chicken.webp",
      badge: "Local Favorite",
      priceValue: 30,
      rating: "4.6",
      location: "Dahab City Center",
      price: "$10-25",
      buttonText: "Try Now",
      href: "/restaurants/king-chicken",
      // Details
      phone: "+20 69 360 1111",
      email: "info@kingchicken.com",
      website: "https://kingchicken-dahab.com",
      openingHours: {
        monday: "9:00 AM - 11:00 PM",
        tuesday: "9:00 AM - 11:00 PM",
        wednesday: "9:00 AM - 11:00 PM",
        thursday: "9:00 AM - 11:00 PM",
        friday: "9:00 AM - 12:00 AM",
        saturday: "9:00 AM - 12:00 AM",
        sunday: "9:00 AM - 11:00 PM",
      },
      menu: [
        {
          name: "Grilled Chicken",
          price: "$12",
          description: "Traditional Egyptian grilled chicken",
        },
        {
          name: "Mahshi (Stuffed Vegetables)",
          price: "$10",
          description: "Rice-stuffed vegetables in tomato sauce",
        },
        {
          name: "Koshari",
          price: "$8",
          description: "Egyptian rice, lentils, and pasta dish",
        },
      ],
      features: [
        "Traditional Egyptian",
        "Budget Friendly",
        "Quick Service",
        "Takeaway Available",
      ],
      gallery: [
        {
          src: "Dine-Images/King Chicken.webp",
          alt: "Restaurant",
          title: "King Chicken",
          description: "Egyptian cuisine",
        },
      ],
      reviews: [
        {
          name: "Ahmed Hassan",
          rating: 5,
          comment: "Best mahshi in town!",
          date: "October 11, 2025",
        },
      ],
    },
    {
      id: 5,
      IdPage: "el-sharkawy",
      title: "El Sharkawy Restaurant",
      category: "Egyptian & Oriental",
      subtitle: "Authentic Egyptian",
      description:
        "Located in Assala, known for simple but very tasty local Egyptian food and warm atmosphere.",
      image: "Dine-Images/El Sharkawy Restaurant.webp",
      badge: "Authentic",
      priceValue: 28,
      rating: "4.5",
      location: "Assala, Dahab",
      price: "$12-22",
      buttonText: "Book Table",
      href: "/restaurants/el-sharkawy",
      // Details
      phone: "+20 69 360 2222",
      email: "info@elsharkawy.com",
      website: "https://elsharkawy-dahab.com",
      openingHours: {
        monday: "8:00 AM - 10:00 PM",
        tuesday: "8:00 AM - 10:00 PM",
        wednesday: "8:00 AM - 10:00 PM",
        thursday: "8:00 AM - 10:00 PM",
        friday: "8:00 AM - 11:00 PM",
        saturday: "8:00 AM - 11:00 PM",
        sunday: "8:00 AM - 10:00 PM",
      },
      menu: [
        {
          name: "Ful Medames",
          price: "$5",
          description: "Traditional fava bean breakfast",
        },
        {
          name: "Falafel Plate",
          price: "$7",
          description: "Crispy falafel with tahini sauce",
        },
      ],
      features: ["Authentic Egyptian", "Breakfast Specials", "Local Vibe"],
      gallery: [
        {
          src: "Dine-Images/El Sharkawy Restaurant.webp",
          alt: "Restaurant",
          title: "El Sharkawy",
          description: "Egyptian food",
        },
      ],
      reviews: [
        {
          name: "Omar Ali",
          rating: 4,
          comment: "Great local food!",
          date: "October 9, 2025",
        },
      ],
    },
    {
      id: 6,
      IdPage: "yum-yum",
      title: "Yum Yum Egyptian Food",
      category: "Egyptian & Oriental",
      subtitle: "Fast Egyptian Food",
      description:
        "Specializing in fast local Egyptian favorites: foul, koshari, grills and popular plates.",
      image: "Dine-Images/Yum Yum Egyptian Food.webp",
      badge: "Quick Bites",
      priceValue: 15,
      rating: "4.7",
      location: "Old Dahab",
      price: "$5-15",
      buttonText: "Menu",
      href: "/restaurants/yum-yum",
      // Details
      phone: "+20 69 360 3333",
      email: "info@yumyum-dahab.com",
      website: "https://yumyum-dahab.com",
      openingHours: {
        monday: "7:00 AM - 10:00 PM",
        tuesday: "7:00 AM - 10:00 PM",
        wednesday: "7:00 AM - 10:00 PM",
        thursday: "7:00 AM - 10:00 PM",
        friday: "7:00 AM - 11:00 PM",
        saturday: "7:00 AM - 11:00 PM",
        sunday: "7:00 AM - 10:00 PM",
      },
      menu: [
        {
          name: "Koshari Bowl",
          price: "$6",
          description: "Classic Egyptian koshari",
        },
        {
          name: "Grilled Kofta",
          price: "$10",
          description: "Spiced minced meat kebabs",
        },
      ],
      features: ["Fast Service", "Budget Friendly", "Takeaway"],
      gallery: [
        {
          src: "Dine-Images/Yum Yum Egyptian Food.webp",
          alt: "Restaurant",
          title: "Yum Yum",
          description: "Fast Egyptian food",
        },
      ],
      reviews: [
        {
          name: "Fatma Mohamed",
          rating: 5,
          comment: "Quick and tasty!",
          date: "October 7, 2025",
        },
      ],
    },

    // ==================== Syrian & Levantine ====================
    {
      id: 7,
      IdPage: "beirut-nights",
      title: "Beirut Nights",
      category: "Syrian & Levantine",
      subtitle: "Lebanese & Syrian",
      description:
        "Famous for authentic Lebanese and Syrian mezze dishes, live music and friendly atmosphere.",
      image: "Dine-Images/Beirut Nights.webp",
      badge: "Levantine Flavors",
      priceValue: 40,
      rating: "4.7",
      location: "Zamalek, Cairo",
      price: "$15-30",
      buttonText: "Reserve Table",
      href: "/restaurants/beirut-nights",
      // Details
      phone: "+20 2 2735 4444",
      email: "info@beirutnights.com",
      website: "https://beirutnights.com",
      openingHours: {
        monday: "12:00 PM - 12:00 AM",
        tuesday: "12:00 PM - 12:00 AM",
        wednesday: "12:00 PM - 12:00 AM",
        thursday: "12:00 PM - 12:00 AM",
        friday: "12:00 PM - 1:00 AM",
        saturday: "12:00 PM - 1:00 AM",
        sunday: "12:00 PM - 12:00 AM",
      },
      menu: [
        {
          name: "Mixed Mezze Platter",
          price: "$20",
          description: "Selection of hummus, baba ganoush, and more",
        },
        {
          name: "Lamb Kebab",
          price: "$25",
          description: "Grilled lamb skewers with rice",
        },
      ],
      features: ["Live Music", "Outdoor Seating", "Hookah Available"],
      gallery: [],
      reviews: [
        {
          name: "Layla Ibrahim",
          rating: 5,
          comment: "Authentic Lebanese food!",
          date: "October 6, 2025",
        },
      ],
    },
    {
      id: 8,
      IdPage: "damascus-plaza",
      title: "Damascus Plaza",
      category: "Syrian & Levantine",
      subtitle: "Syrian Cuisine",
      description:
        "Popular shawarma and kebabs with authentic spices, loved across the region.",
      image: "Dine-Images/Damascus Plaza.webp",
      badge: "Must Try",
      priceValue: 30,
      rating: "4.6",
      location: "Maadi, Cairo",
      price: "$10-25",
      buttonText: "View Menu",
      href: "/restaurants/damascus-plaza",
      // Details
      phone: "+20 2 2516 5555",
      email: "info@damascusplaza.com",
      website: "https://damascusplaza.com",
      openingHours: {
        monday: "11:00 AM - 11:00 PM",
        tuesday: "11:00 AM - 11:00 PM",
        wednesday: "11:00 AM - 11:00 PM",
        thursday: "11:00 AM - 11:00 PM",
        friday: "11:00 AM - 12:00 AM",
        saturday: "11:00 AM - 12:00 AM",
        sunday: "11:00 AM - 11:00 PM",
      },
      menu: [
        {
          name: "Chicken Shawarma",
          price: "$12",
          description: "Marinated chicken with tahini",
        },
        {
          name: "Mixed Grill",
          price: "$22",
          description: "Kebab, kofta, and chicken",
        },
      ],
      features: ["Syrian Specialties", "Takeaway", "Family Friendly"],
      gallery: [],
      reviews: [
        {
          name: "Khaled Saad",
          rating: 4,
          comment: "Great shawarma!",
          date: "October 5, 2025",
        },
      ],
    },
    {
      id: 9,
      IdPage: "levantine-sweets-cafe",
      title: "Levantine Sweets Café",
      category: "Syrian & Levantine",
      subtitle: "Levantine Desserts",
      description: "Specialty sweets and coffee with charming ambiance.",
      image: "Dine-Images/Levantine Sweets Café.webp",
      badge: "Sweet Treats",
      priceValue: 18,
      rating: "4.5",
      location: "Heliopolis, Cairo",
      price: "$5-15",
      buttonText: "Order Now",
      href: "/restaurants/levantine-sweets-cafe",
      // Details
      phone: "+20 2 2267 6666",
      email: "info@levantinesweets.com",
      website: "https://levantinesweets.com",
      openingHours: {
        monday: "9:00 AM - 11:00 PM",
        tuesday: "9:00 AM - 11:00 PM",
        wednesday: "9:00 AM - 11:00 PM",
        thursday: "9:00 AM - 11:00 PM",
        friday: "9:00 AM - 12:00 AM",
        saturday: "9:00 AM - 12:00 AM",
        sunday: "9:00 AM - 11:00 PM",
      },
      menu: [
        {
          name: "Baklava Assortment",
          price: "$10",
          description: "Mixed baklava with pistachios",
        },
        {
          name: "Arabic Coffee",
          price: "$5",
          description: "Traditional cardamom coffee",
        },
      ],
      features: ["Dessert Specialist", "Cozy Ambiance", "WiFi"],
      gallery: [],
      reviews: [],
    },

    // ==================== Cafés & Bakeries ====================
    {
      id: 10,
      IdPage: "everyday-cafe",
      title: "Everyday Café",
      category: "Cafés & Bakeries",
      subtitle: "Scenic Coffee Spot",
      description:
        "Located on the seaside promenade with stunning views, best coffee and juices for relaxed long visits.",
      image: "Dine-Images/Everyday Café.webp",
      badge: "Sea View",
      priceValue: 20,
      rating: "4.7",
      location: "Seaside Promenade, Dahab",
      price: "$5-12",
      buttonText: "Visit Café",
      href: "/cafes/everyday-cafe",
      // Details
      phone: "+20 69 360 7777",
      email: "info@everydaycafe.com",
      website: "https://everydaycafe-dahab.com",
      openingHours: {
        monday: "7:00 AM - 11:00 PM",
        tuesday: "7:00 AM - 11:00 PM",
        wednesday: "7:00 AM - 11:00 PM",
        thursday: "7:00 AM - 11:00 PM",
        friday: "7:00 AM - 12:00 AM",
        saturday: "7:00 AM - 12:00 AM",
        sunday: "7:00 AM - 11:00 PM",
      },
      menu: [
        {
          name: "Cappuccino",
          price: "$4",
          description: "Classic Italian cappuccino",
        },
        {
          name: "Fresh Juice",
          price: "$6",
          description: "Seasonal fresh fruit juice",
        },
      ],
      features: ["Sea View", "WiFi", "Outdoor Seating"],
      gallery: [],
      reviews: [],
    },
    {
      id: 11,
      IdPage: "ralphs-german-bakery",
      title: "Ralph's German Bakery",
      category: "Cafés & Bakeries",
      subtitle: "Bakery & Breakfast",
      description:
        "Famous for breakfast and pastries, homely vibe with excellent coffee and sweets.",
      image: "Dine-Images/Ralph's German Bakery.webp",
      badge: "Breakfast Spot",
      priceValue: 15,
      rating: "4.8",
      location: "Dahab City Center",
      price: "$5-15",
      buttonText: "See Menu",
      href: "/cafes/ralphs-german-bakery",
      // Details
      phone: "+20 69 360 8888",
      email: "info@ralphsbakery.com",
      website: "https://ralphsbakery-dahab.com",
      openingHours: {
        monday: "6:00 AM - 9:00 PM",
        tuesday: "6:00 AM - 9:00 PM",
        wednesday: "6:00 AM - 9:00 PM",
        thursday: "6:00 AM - 9:00 PM",
        friday: "6:00 AM - 10:00 PM",
        saturday: "6:00 AM - 10:00 PM",
        sunday: "6:00 AM - 9:00 PM",
      },
      menu: [
        {
          name: "Croissant",
          price: "$3",
          description: "Butter croissant",
        },
        {
          name: "Breakfast Plate",
          price: "$10",
          description: "Eggs, bread, cheese, and coffee",
        },
      ],
      features: ["Fresh Bakery", "Breakfast Specialist", "Takeaway"],
      gallery: [],
      reviews: [],
    },
    {
      id: 12,
      IdPage: "flat-white-cafe",
      title: "Flat White Café",
      category: "Cafés & Bakeries",
      subtitle: "Relaxed & Cozy",
      description:
        "A great café to relax with quality coffee, near the waterfront with cozy atmosphere.",
      image: "Dine-Images/Flat White Café.webp",
      badge: "Cozy Setting",
      priceValue: 18,
      rating: "4.6",
      location: "Waterfront, Dahab",
      price: "$6-14",
      buttonText: "Try Coffee",
      href: "/cafes/flat-white-cafe",
      // Details
      phone: "+20 69 360 9999",
      email: "info@flatwhite-dahab.com",
      website: "https://flatwhite-dahab.com",
      openingHours: {
        monday: "7:00 AM - 10:00 PM",
        tuesday: "7:00 AM - 10:00 PM",
        wednesday: "7:00 AM - 10:00 PM",
        thursday: "7:00 AM - 10:00 PM",
        friday: "7:00 AM - 11:00 PM",
        saturday: "7:00 AM - 11:00 PM",
        sunday: "7:00 AM - 10:00 PM",
      },
      menu: [
        {
          name: "Flat White",
          price: "$5",
          description: "Smooth espresso with milk",
        },
        {
          name: "Cake Slice",
          price: "$6",
          description: "Homemade cake of the day",
        },
      ],
      features: ["Specialty Coffee", "WiFi", "Cozy Interior"],
      gallery: [],
      reviews: [],
    },
  ];

  return (
    <DineContext.Provider value={{ restaurants, categories }}>
      {children}
    </DineContext.Provider>
  );
};

export const useDine = () => {
  return useContext(DineContext);
};

export default DineProvider;

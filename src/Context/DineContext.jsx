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
  // Seafood Restaurants
  {
    id: 1,
    title: "Prawn House Seafood Restaurant",
    category: "Seafood Restaurants",
    subtitle: "Fresh Sea Food",
    description:
      "Located on Al Fanar street, famous for fresh fish, reasonable prices and excellent service.",
    image:
      "https://blogs.realestate.gov.eg/wp-content/uploads/2024/09/Prawn-House-Seafood-Restaurant-Dahab-Egypt1.png",
    badge: "Fresh & Tasty",
    priceValue: 70,
    rating: "4.9",
    location: "Al Fanar Street, Sharm El Sheikh",
    price: "$25-45",
    buttonText: "View Menu",
    href: "/restaurants/prawn-house",
  },
  {
    id: 2,
    title: "Shark Restaurant",
    category: "Seafood Restaurants",
    subtitle: "Seafood & Grilled Fish",
    description:
      "Located at Masbat Bay waterfront, known for grilled fish and diverse mid-range options.",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/01/bd/4f/30/shark.jpg",
    badge: "Seafood Specialist",
    priceValue: 60,
    rating: "4.7",
    location: "Masbat Bay, Sharm El Sheikh",
    price: "$20-40",
    buttonText: "Book a Table",
    href: "/restaurants/shark-restaurant",
  },
  {
    id: 3,
    title: "Al Manar Restaurant",
    category: "Seafood Restaurants",
    subtitle: "Local Seafood",
    description:
      "At Masbat, offering fresh fish dishes with spectacular Red Sea views.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/9a/44/82/photo0jpg.jpg?w=900&h=500&s=1",
    badge: "Top Pick",
    priceValue: 50,
    rating: "4.8",
    location: "Masbat, Dahab",
    price: "$15-35",
    buttonText: "Visit Restaurant",
    href: "/restaurants/al-manar",
  },

  // Egyptian & Oriental
  {
    id: 4,
    title: "King Chicken",
    category: "Egyptian & Oriental",
    subtitle: "Egyptian Traditional",
    description:
      "Offering popular Egyptian dishes: grills, stuffed vegetables, homemade specialties.",
    image:
      "",
    badge: "Local Favorite",
    priceValue: 30,
    rating: "4.6",
    location: "Dahab City Center",
    price: "$10-25",
    buttonText: "Try Now",
    href: "/restaurants/king-chicken",
  },
  {
    id: 5,
    title: "El Sharkawy Restaurant",
    category: "Egyptian & Oriental",
    subtitle: "Authentic Egyptian",
    description:
      "Located in Assala, known for simple but very tasty local Egyptian food and warm atmosphere.",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/01/1f/4e/14/image2jpg.jpg",
    badge: "Authentic",
    priceValue: 28,
    rating: "4.5",
    location: "Assala, Dahab",
    price: "$12-22",
    buttonText: "Book Table",
    href: "/restaurants/el-sharkawy",
  },
  {
    id: 6,
    title: "Yum Yum Egyptian Food",
    category: "Egyptian & Oriental",
    subtitle: "Fast Egyptian Food",
    description:
      "Specializing in fast local Egyptian favorites: foul, koshari, grills and popular plates.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFddJuB1LMtPqfEyiFiLtLvUr2CunzAFo6XKu14BWPXNIOdu6HG7YCcfiIO6FzDnqZoY&usqp=CAU",
    badge: "Quick Bites",
    priceValue: 15,
    rating: "4.7",
    location: "Old Dahab",
    price: "$5-15",
    buttonText: "Menu",
    href: "/restaurants/yum-yum",
  },

  // Syrian & Levantine
  {
    id: 7,
    title: "Beirut Nights",
    category: "Syrian & Levantine",
    subtitle: "Lebanese & Syrian",
    description:
      "Famous for authentic Lebanese and Syrian mezze dishes, live music and friendly atmosphere.",
    image:
      "https://cdn.britannica.com/26/198626-050-AAE8502C/Meze-trays-Appetizers-Lebanese-cuisine.jpg",
    badge: "Levantine Flavors",
    priceValue: 40,
    rating: "4.7",
    location: "Zamalek, Cairo",
    price: "$15-30",
    buttonText: "Reserve Table",
    href: "/restaurants/beirut-nights",
  },
  {
    id: 8,
    title: "Damascus Plaza",
    category: "Syrian & Levantine",
    subtitle: "Syrian Cuisine",
    description:
      "Popular shawarma and kebabs with authentic spices, loved across the region.",
    image:
      "https://www.simplyrecipes.com/thmb/Gm63Hbc8xIgWr8ztJWvSKQFwKsA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Shawarma-LEAD-24-c690bb1798a548feb6b3a46eb3e34db2.jpg",
    badge: "Must Try",
    priceValue: 30,
    rating: "4.6",
    location: "Maadi, Cairo",
    price: "$10-25",
    buttonText: "View Menu",
    href: "/restaurants/damascus-plaza",
  },
  {
    id: 9,
    title: "Levantine Sweets Café",
    category: "Syrian & Levantine",
    subtitle: "Levantine Desserts",
    description: "Specialty sweets and coffee with charming ambiance.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQKTvqsRWyo8pTlMu48nQOnVzhAcjLfFh0Atn9fR6hQ&s",
    badge: "Sweet Treats",
    priceValue: 18,
    rating: "4.5",
    location: "Heliopolis, Cairo",
    price: "$5-15",
    buttonText: "Order Now",
    href: "/restaurants/levantine-sweets-cafe",
  },

  // Cafés & Bakeries
  {
    id: 10,
    title: "Everyday Café",
    category: "Cafés & Bakeries",
    subtitle: "Scenic Coffee Spot",
    description:
      "Located on the seaside promenade with stunning views, best coffee and juices for relaxed long visits.",
    image:
      "https://i.insinai.com/uploads/everyday_cafe_dahab_1_400x400.jpg",
    badge: "Sea View",
    priceValue: 20,
    rating: "4.7",
    location: "Seaside Promenade, Dahab",
    price: "$5-12",
    buttonText: "Visit Café",
    href: "/cafes/everyday-cafe",
  },
  {
    id: 11,
    title: "Ralph’s German Bakery",
    category: "Cafés & Bakeries",
    subtitle: "Bakery & Breakfast",
    description:
      "Famous for breakfast and pastries, homely vibe with excellent coffee and sweets.",
    image:
      "https://img.ibnbattutatravel.com/ibnams/uploads/userfiles/73/ralph-german-bakery.jpg",
    badge: "Breakfast Spot",
    priceValue: 15,
    rating: "4.8",
    location: "Dahab City Center",
    price: "$5-15",
    buttonText: "See Menu",
    href: "/cafes/ralphs-german-bakery",
  },
  {
    id: 12,
    title: "Flat White Café",
    category: "Cafés & Bakeries",
    subtitle: "Relaxed & Cozy",
    description:
      "A great café to relax with quality coffee, near the waterfront with cozy atmosphere.",
    image:
      "https://www.habibs.life/blog/wp-content/uploads/2022/02/flat-white-cafe-dahab.jpg",
    badge: "Cozy Setting",
    priceValue: 18,
    rating: "4.6",
    location: "Waterfront, Dahab",
    price: "$6-14",
    buttonText: "Try Coffee",
    href: "/cafes/flat-white-cafe",
  },
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

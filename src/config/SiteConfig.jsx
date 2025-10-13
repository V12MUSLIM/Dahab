// Configuration file for Dahab Tourism app

// Contact Information
export const CONTACT = {
  phone: "+20 123 456 789",
  email: "info@dahabtourism.com",
};

// Route definitions
export const ROUTES = {
  home: "/",
  destinations: "/destinations",
  experiences: "/experiences",
  stay: "/stay",
  dine: "/dine",
  planTrip: "/plantrip",
  about: "/about",
  reviews: "/reviews",
  groups: "/groups",
  contact: "/contact",
  login: "/login",
  // Destination specific routes
  blueHole: "/destinations/blue-hole",
  mountSinai: "/destinations/mount-sinai",
  coloredCanyon: "/destinations/colored-canyon",
  lagoon: "/destinations/lagoon",

  // Activity specific routes
  diving: "/activities/diving",
  safari: "/activities/safari",
  snorkeling: "/activities/snorkeling",
};

// Navigation items
export const DESTINATIONS = [
  {
    name: "Blue Hole",
    description: "World-famous diving spot with crystal clear waters",
    iconName: "Waves",
    href: ROUTES.blueHole,
  },
  {
    name: "Mount Sinai",
    description: "Sacred mountain with breathtaking sunrise views",
    iconName: "Mountain",
    href: ROUTES.mountSinai,
  },
  {
    name: "Colored Canyon",
    description: "Spectacular rock formations and hiking trails",
    iconName: "Mountain",
    href: ROUTES.coloredCanyon,
  },
  {
    name: "Dahab Lagoon",
    description: "Perfect for windsurfing and kitesurfing",
    iconName: "Waves",
    href: ROUTES.lagoon,
  },
];

export const EXPERIENCES = [
  {
    name: "Scuba Diving",
    description: "Explore the Red Sea's underwater paradise",
    iconName: "Waves",
    href: ROUTES.diving,
  },
  {
    name: "Desert Safari",
    description: "Camel rides and Bedouin culture experiences",
    iconName: "Camera",
    href: ROUTES.safari,
  },
  {
    name: "Snorkeling Tours",
    description: "Discover colorful coral reefs and marine life",
    iconName: "Waves",
    href: ROUTES.snorkeling,
  },
];

// UI Text
export const UI_TEXT = {
  search: {
    placeholder: "Search destinations, activities...",
    desktopPlaceholder: "Search destinations...",
  },
  navigation: {
    home: "Home",
    destinations: "Destinations",
    experiences: "Experiences",
    stay: "Stay",
    dine: "Dine",
    planTrip: "Plan Trip",
    places: "Places",
    activities: "Activities",
    plan: "Plan",
    more: "More",
    menu: "Menu",
  },
  buttons: {
    bookNow: "Login",
    bookAdventure: "Book Your Adventure",
    viewAll: "View All",
  },
  sections: {
    more: "More",
    getInTouch: "Get In Touch",
  },
  menu: {
    aboutDahab: "About Dahab",
    reviews: "Reviews",
    groupTours: "Group Tours",
  },
  aria: {
    openMenu: "Open menu",
  },
};

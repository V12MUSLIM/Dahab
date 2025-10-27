// Configuration file for Dahab Tourism app

// Contact Information
export const CONTACT = {
  phone: "+20 10000000000",
  email: "info@dahabtourism.com",
};
// Social Media Links
export const SOCIAL_MEDIA = [
  {
    name: "Facebook",
    icon: "facebook.svg",
    href: "https://www.facebook.com/eng.mostafa.a.maher",
    label: "Follow us on Facebook",
    color: "hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400",
  },
  {
    name: "Instagram",
    icon: "instagram.svg",
    href: "https://instagram.com/dahabtourism",
    label: "Follow us on Instagram",
    color: "hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-orange-500",
  },
  {
    name: "Twitter",
    icon: "x.svg",
    href: "https://twitter.com/dahabtourism",
    label: "Follow us on Twitter",
    color: "hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-950",
  },
  {
    name: "YouTube",
    icon: "youtube.svg",
    href: "https://youtube.com/dahabtourism",
    label: "Subscribe on YouTube",
    color: "hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500",
  },
  {
    name: "Email",
    icon: "Mail",
    href: `mailto:${CONTACT.email}`,
    label: "Email us",
    color: "hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500",
  },
  {
    name: "Location",
    icon: "MapPin",
    href: "https://maps.google.com/?q=Dahab,Egypt",
    label: "Find us on map",
    color: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400",
  },
  {
    name: "Phone",
    icon: "Phone",
    href: `tel:${CONTACT.phone}`,
    label: "Call us",
    color: "hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500",
  },
];

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
  // Dashboard routes
  dashboard: "/dashboard",
  dashboardDestinations: "/dashboard/destinations",
  dashboardActivities: "/dashboard/activities",
  dashboardPackages: "/dashboard/packages",
  dashboardBookings: "/dashboard/bookings",
  dashboardUsers: "/dashboard/users",
  dashboardAnalytics: "/dashboard/analytics",
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
    login: "login",
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

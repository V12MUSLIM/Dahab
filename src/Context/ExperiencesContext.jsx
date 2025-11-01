// context/ExperienceContext.jsx
"use client";
import React, { createContext, useState, useContext } from 'react';

const ExperienceContext = createContext();

export const useExperience = () => {
    const context = useContext(ExperienceContext);
    if (!context) {
        throw new Error('useExperience must be used within ExperienceProvider');
    }
    return context;
};

export const ExperienceProvider = ({ children }) => {
    const [experiencesByCategory] = useState([
        {
            category: "Water Adventures",
            categoryId: "water-adventures",
            description: "Dive into the crystal-clear waters of the Red Sea",
            experiences: [
                {
                    // Basic Info
                    id: "w1",
                    IdPage: "scuba-diving",
                    type: "activity",
                    title: "Scuba Diving",
                    subtitle: "Water Adventure",
                    description: "Explore the Red Sea's vibrant coral reefs and rich underwater paradise with our certified guides.",
                    fullDescription: "Experience the breathtaking underwater world of Dahab with our professional scuba diving tours. The Red Sea is home to some of the world's most spectacular coral reefs, diverse marine life, and crystal-clear waters with visibility up to 30 meters. Whether you're a beginner or an experienced diver, our PADI-certified instructors will guide you through an unforgettable journey beneath the waves.",

                    // Images
                    images: ["Experience/scuba-divingHero.webp"],
                    
                    galleryImages: [
                        "/Experience/scuba-diving1.webp",
                        "/Experience/scuba-diving2.webp",
                        "/Experience/scuba-diving3.webp",
                    ],

                    // Badges & Rating
                    badge: "Popular",
                    rating: "4.9",
                    totalReviews: 287,

                    // Location
                    location: "Dahab Red Sea",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.5056, lng: 34.5136 },
                        meetingPoint: "Dahab Dive Center - Lighthouse Road"
                    },

                    // Duration & Group
                    duration: "3-4 hours",
                    durationMinutes: 210,
                    groupSize: "4-6 people",
                    minGroupSize: 2,
                    maxGroupSize: 6,

                    // Difficulty
                    difficulty: "Beginner",
                    difficultyLevel: 2,
                    minAge: 12,

                    // Pricing
                    price: "$75",
                    priceAmount: 75,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Full diving equipment rental",
                        "PADI-certified instructor",
                        "2 guided dives",
                        "Hotel pickup and drop-off",
                        "Drinking water and snacks",
                        "Underwater photos"
                    ],

                    // Links
                    href: "/experiences/scuba-diving",
                    bookingUrl: "/book/scuba-diving"
                },
                {
                    // Basic Info
                    id: "w2",
                    IdPage: "snorkeling-tours",
                    type: "activity",
                    title: "Snorkeling Tours",
                    subtitle: "Water Adventure",
                    description: "Discover colorful marine life just below the surface in Dahab's most beautiful snorkeling spots.",
                    fullDescription: "Explore the stunning underwater world of Dahab without the need for diving certification! Our snorkeling tours take you to the best shallow reef sites where you can swim among vibrant coral gardens and colorful tropical fish. Perfect for families and beginners.",

                    // Images
                    images: ["Experience/snorkeling-toursHero.webp"],
                   
                    galleryImages: [
                        "Experience/snorkeling-tours1.webp",
                        "Experience/snorkeling-tours2.webp",
                        "Experience/snorkeling-tours3.webp",
                    ],

                    // Badges & Rating
                    badge: "Family Friendly",
                    rating: "4.8",
                    totalReviews: 194,

                    // Location
                    location: "Dahab Coast",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.4967, lng: 34.5105 },
                        meetingPoint: "Dahab Snorkel Center - Assalah Beach"
                    },

                    // Duration & Group
                    duration: "2-3 hours",
                    durationMinutes: 150,
                    groupSize: "6-10 people",
                    minGroupSize: 2,
                    maxGroupSize: 10,

                    // Difficulty
                    difficulty: "Easy",
                    difficultyLevel: 1,
                    minAge: 6,

                    // Pricing
                    price: "$45",
                    priceAmount: 45,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Snorkeling equipment",
                        "Life jacket",
                        "Experienced guide",
                        "Beach access",
                        "Drinking water",
                        "Underwater photos"
                    ],

                    // Links
                    href: "/experiences/snorkeling-tours",
                    bookingUrl: "/book/snorkeling-tours"
                },
                {
                    // Basic Info
                    id: "w3",
                    IdPage: "windsurfing-kitesurfing",
                    type: "activity",
                    title: "Windsurfing & Kitesurfing",
                    subtitle: "Water Adventure",
                    description: "Ride the waves and feel the thrill of the wind at the famous Dahab Lagoon.",
                    fullDescription: "Experience the ultimate adrenaline rush with windsurfing and kitesurfing at Dahab Lagoon, one of the world's premier wind sports destinations. With consistent winds, shallow flat water, and year-round perfect conditions, Dahab is a paradise for both beginners and advanced riders.",

                    // Images
                    images: ["Experience/windsurfing-kitesurfingHero.webp"],
                    
                    galleryImages: [
                        "Experience/windsurfing-kitesurfing1.webp",
                        "Experience/windsurfing-kitesurfing2.webp",
                        "Experience/windsurfing-kitesurfingHero.webp",
                    ],

                    // Badges & Rating
                    badge: "Adrenaline",
                    rating: "4.9",
                    totalReviews: 156,

                    // Location
                    location: "Dahab Lagoon",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.5100, lng: 34.5200 },
                        meetingPoint: "Dahab Kite Station - Lagoon Beach"
                    },

                    // Duration & Group
                    duration: "2-4 hours",
                    durationMinutes: 180,
                    groupSize: "2-4 people",
                    minGroupSize: 1,
                    maxGroupSize: 4,

                    // Difficulty
                    difficulty: "Intermediate",
                    difficultyLevel: 3,
                    minAge: 14,

                    // Pricing
                    price: "$85",
                    priceAmount: 85,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Professional IKO-certified instructor",
                        "All kitesurfing/windsurfing equipment",
                        "Harness, helmet, and safety gear",
                        "Safety briefing and theory",
                        "Radio helmet for instruction",
                        "Action photos"
                    ],

                    // Links
                    href: "/experiences/windsurfing-kitesurfing",
                    bookingUrl: "/book/windsurfing-kitesurfing"
                },
            ],
        },
        {
            category: "Desert Adventures",
            categoryId: "desert-adventures",
            description: "Discover the magic of the Sinai Desert",
            experiences: [
                {
                    // Basic Info
                    id: "d1",
                    IdPage: "desert-safari",
                    type: "activity",
                    title: "Desert Safari",
                    subtitle: "Desert Adventure",
                    description: "Experience the thrill of a quad bike ride across the Sinai desert and enjoy Bedouin hospitality.",
                    fullDescription: "Embark on an unforgettable desert safari adventure through the stunning Sinai Peninsula. Ride powerful quad bikes across golden dunes and rugged terrain, visit authentic Bedouin camps, and experience traditional hospitality with mint tea and local cuisine. Watch the spectacular desert sunset paint the mountains in shades of gold and purple.",

                    // Images
                    images: ["Experience/desert-safariHero.webp"],
                    
                    galleryImages: [
                        "Experience/desert-safari1.webp",
                        "Experience/desert-safari2.webp",
                        "Experience/desert-safariHero.webp",
                    ],

                    // Badges & Rating
                    badge: "Adventure",
                    rating: "4.9",
                    totalReviews: 412,

                    // Location
                    location: "Sinai Desert",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.4500, lng: 34.4000 },
                        meetingPoint: "Dahab City Center - Safari Office"
                    },

                    // Duration & Group
                    duration: "5-6 hours",
                    durationMinutes: 330,
                    groupSize: "6-12 people",
                    minGroupSize: 2,
                    maxGroupSize: 12,

                    // Difficulty
                    difficulty: "Moderate",
                    difficultyLevel: 2,
                    minAge: 16,

                    // Pricing
                    price: "$95",
                    priceAmount: 95,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Hotel pickup and drop-off",
                        "Quad bike rental",
                        "Safety equipment",
                        "Professional guide",
                        "Visit to Bedouin camp",
                        "Traditional tea ceremony",
                        "Bedouin dinner buffet",
                        "Sunset viewing"
                    ],

                    // Links
                    href: "/experiences/desert-safari",
                    bookingUrl: "/book/desert-safari"
                },
                {
                    // Basic Info
                    id: "d2",
                    IdPage: "bedouin-dinner",
                    type: "activity",
                    title: "Bedouin Dinner Under the Stars",
                    subtitle: "Cultural Experience",
                    description: "A magical evening with authentic Bedouin cuisine, traditional music, and stargazing.",
                    fullDescription: "Immerse yourself in authentic Bedouin culture with an enchanting evening in the Sinai Desert. Travel to a traditional Bedouin camp where you'll be welcomed with warm hospitality and sweet mint tea. Watch the sunset paint the desert in golden hues, then enjoy a delicious traditional dinner prepared using ancient Bedouin cooking methods.",

                    // Images
                    images: ["Experience/bedouin-dinnerHero.webp"],
                   
                    galleryImages: [
                        "Experience/bedouin-dinner1.webp",
                        "Experience/bedouin-dinner2.webp",
                        "Experience/bedouin-dinner3.webp",
                    ],

                    // Badges & Rating
                    badge: "Cultural",
                    rating: "5.0",
                    totalReviews: 289,

                    // Location
                    location: "Bedouin Camp",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.4200, lng: 34.3800 },
                        meetingPoint: "Dahab City Center - Tour Office"
                    },

                    // Duration & Group
                    duration: "3-4 hours",
                    durationMinutes: 210,
                    groupSize: "8-20 people",
                    minGroupSize: 2,
                    maxGroupSize: 20,

                    // Difficulty
                    difficulty: "Easy",
                    difficultyLevel: 1,
                    minAge: 0,

                    // Pricing
                    price: "$65",
                    priceAmount: 65,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Hotel pickup and drop-off",
                        "Traditional Bedouin tea ceremony",
                        "Complete traditional dinner buffet",
                        "Live Bedouin music performance",
                        "Cultural storytelling",
                        "Stargazing experience",
                        "Campfire experience"
                    ],

                    // Links
                    href: "/experiences/bedouin-dinner",
                    bookingUrl: "/book/bedouin-dinner"
                },
                {
                    // Basic Info
                    id: "d3",
                    IdPage: "rock-climbing-hiking",
                    type: "activity",
                    title: "Rock Climbing & Hiking",
                    subtitle: "Adventure Sport",
                    description: "Challenge yourself on the stunning rock faces and hiking trails of the Sinai mountains.",
                    fullDescription: "Push your limits with an exhilarating rock climbing and hiking adventure in the majestic Sinai Mountains. Whether you're a beginner or experienced climber, our certified guides will lead you through stunning routes with breathtaking views of desert and sea. The unique granite and limestone formations offer diverse climbing challenges.",

                    // Images
                    images: ["Experience/rock-climbing-hikingHero.webp"],
                    
                    galleryImages: [
                        "Experience/rock-climbing-hiking1.webp",
                        "Experience/rock-climbing-hiking2.webp",
                        "Experience/rock-climbing-hiking3.webp",
                    ],

                    // Badges & Rating
                    badge: "Adventure",
                    rating: "4.8",
                    totalReviews: 178,

                    // Location
                    location: "Sinai Mountains",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.5200, lng: 34.4500 },
                        meetingPoint: "Dahab Adventure Center"
                    },

                    // Duration & Group
                    duration: "4-6 hours",
                    durationMinutes: 300,
                    groupSize: "4-8 people",
                    minGroupSize: 2,
                    maxGroupSize: 8,

                    // Difficulty
                    difficulty: "Advanced",
                    difficultyLevel: 4,
                    minAge: 14,

                    // Pricing
                    price: "$105",
                    priceAmount: 105,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Certified climbing instructor",
                        "All climbing equipment",
                        "Safety gear",
                        "Hotel transportation",
                        "Snacks and water",
                        "First aid kit",
                        "Photos of your climb"
                    ],

                    // Links
                    href: "/experiences/rock-climbing-hiking",
                    bookingUrl: "/book/rock-climbing-hiking"
                },
            ],
        },
        {
            category: "Relaxation & Wellness",
            categoryId: "relaxation-wellness",
            description: "Rejuvenate your body and mind",
            experiences: [
                {
                    // Basic Info
                    id: "r1",
                    IdPage: "sunrise-yoga",
                    type: "wellness",
                    title: "Sunrise Yoga Sessions",
                    subtitle: "Wellness",
                    description: "Start your day with a rejuvenating yoga session on the beach, facing the beautiful sunrise.",
                    fullDescription: "Begin your day in the most peaceful way possible with sunrise yoga on Dahab's pristine beach. As the sun rises over the Red Sea, practice gentle yoga flows, breathing exercises, and meditation guided by experienced instructors. The combination of soft morning light, ocean sounds, and fresh sea air creates the perfect environment for mindfulness and rejuvenation.",

                    // Images
                    images: ["Experience/sunrise-yogaHero.webp"],
                   
                    galleryImages: [
                        "Experience/sunrise-yoga1.webp",
                        "Experience/sunrise-yoga2.webp",
                        "Experience/sunrise-yoga3.webp",
                    ],

                    // Badges & Rating
                    badge: "Wellness",
                    rating: "4.9",
                    totalReviews: 234,

                    // Location
                    location: "Dahab Beach",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.4967, lng: 34.5105 },
                        meetingPoint: "Dahab Beachfront - Yoga Platform"
                    },

                    // Duration & Group
                    duration: "1-2 hours",
                    durationMinutes: 90,
                    groupSize: "4-12 people",
                    minGroupSize: 1,
                    maxGroupSize: 12,

                    // Difficulty
                    difficulty: "Easy",
                    difficultyLevel: 1,
                    minAge: 12,

                    // Pricing
                    price: "$35",
                    priceAmount: 35,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "Professional yoga instructor",
                        "Yoga mat and props",
                        "Beach location with ocean views",
                        "Guided meditation",
                        "Breathing exercises",
                        "Fresh juice or tea after class"
                    ],

                    // Links
                    href: "/experiences/sunrise-yoga",
                    bookingUrl: "/book/sunrise-yoga"
                },
                {
                    // Basic Info
                    id: "r2",
                    IdPage: "meditation-spa",
                    type: "wellness",
                    title: "Meditation & Spa Treatments",
                    subtitle: "Wellness",
                    description: "Find your inner peace with guided meditation and indulge in our relaxing spa packages.",
                    fullDescription: "Escape the stresses of daily life with a luxurious combination of guided meditation and therapeutic spa treatments. Begin with a tranquil meditation session that calms the mind and reduces stress, followed by your choice of professional spa services including massage, aromatherapy, and body treatments.",

                    // Images
                    images: ["Experience/meditation-spaHero.webp"],
                    
                    galleryImages: [
                        "Experience/meditation-spa1.webp",
                        "Experience/meditation-spa2.webp",
                        "Experience/meditation-spa3.webp",
                    ],

                    // Badges & Rating
                    badge: "Relaxation",
                    rating: "5.0",
                    totalReviews: 312,

                    // Location
                    location: "Wellness Center",
                    locationDetails: {
                        city: "Dahab",
                        region: "South Sinai",
                        country: "Egypt",
                        coordinates: { lat: 28.4980, lng: 34.5120 },
                        meetingPoint: "Dahab Wellness & Spa Center"
                    },

                    // Duration & Group
                    duration: "2-3 hours",
                    durationMinutes: 150,
                    groupSize: "2-6 people",
                    minGroupSize: 1,
                    maxGroupSize: 6,

                    // Difficulty
                    difficulty: "Easy",
                    difficultyLevel: 1,
                    minAge: 16,

                    // Pricing
                    price: "$85",
                    priceAmount: 85,
                    currency: "USD",

                    // What's Included
                    priceIncludes: [
                        "30-minute guided meditation session",
                        "60-minute spa treatment",
                        "Use of spa facilities",
                        "Herbal tea and healthy snacks",
                        "Aromatherapy",
                        "Relaxation lounge access"
                    ],

                    // Links
                    href: "/experiences/meditation-spa",
                    bookingUrl: "/book/meditation-spa"
                },
            ],
        },
    ]);

    // Helper Functions
    const getAllExperiences = () => {
        return experiencesByCategory.flatMap(category =>
            category.experiences.map(exp => ({
                ...exp,
                category: category.category
            }))
        );
    };

    const getExperienceById = (id) => {
        const allExperiences = getAllExperiences();
        return allExperiences.find(exp => exp.id === id || exp.IdPage === id);
    };

    const getExperiencesByCategory = (categoryName) => {
        const category = experiencesByCategory.find(cat =>
            cat.category === categoryName || cat.categoryId === categoryName
        );
        return category ? category.experiences : [];
    };



    const getRelatedExperiences = (experienceId) => {
        const experience = getExperienceById(experienceId);
        if (!experience || !experience.relatedExperiences) return [];

        return experience.relatedExperiences
            .map(id => getExperienceById(id))
            .filter(Boolean);
    };


    const searchExperiences = (searchTerm) => {
        const allExperiences = getAllExperiences();
        const term = searchTerm.toLowerCase();
        return allExperiences.filter(exp =>
            exp.title?.toLowerCase().includes(term) ||
            exp.description?.toLowerCase().includes(term) ||
            exp.location?.toLowerCase().includes(term) ||
            exp.difficulty?.toLowerCase().includes(term)
        );
    };

    const getCategories = () => {
        return experiencesByCategory.map(cat => cat.category);
    };

    const getFeaturedExperiences = () => {
        const allExperiences = getAllExperiences();
        return allExperiences.filter(exp =>
            exp.badge === "Popular" || parseFloat(exp.rating) >= 4.9
        );
    };

    const value = {
        experiencesByCategory,
        getAllExperiences,
        getExperienceById,
        getExperiencesByCategory,
        searchExperiences,
        getCategories,
        getFeaturedExperiences,
        getRelatedExperiences,
    };

    return (
        <ExperienceContext.Provider value={value}>
            {children}
        </ExperienceContext.Provider>
    );
};

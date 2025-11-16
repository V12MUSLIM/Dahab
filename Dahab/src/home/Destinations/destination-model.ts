import mongoose from "mongoose";

export interface IDestination  {
    category: string;
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    longDescription: string;

    image: string[];

    href: string;
    IdPage: string;
    rating: string;
    location: string;
    price: string;
    duration: string;
    groupSize: string;
    difficulty: string;
    bestTime: string;
    galleryImages: {
        src: string;
        alt: string;
        title: string;
        description: string;
    };
    locationDetails: {
        address: string;
        coordinates: { lat: number; lng: number };
        distance: string;
        access: string;
        nearby: string[];
    };
    detailedItinerary: {
        time: string;
        title: string;
        description: string;
        duration: string;
        icon: string;
    }[];
    included: string[];
    notIncluded: string[];
    activities: {
        name: string;
        icon: string;
        description: string;
        difficulty: string;
        duration: string;
    }[];
    highlights: string[];
    reviews: {
        name: string;
        nationality: string;
        rating: number;
        comment: string;
        date: string;
        verified: boolean;
        helpful: number;
    }[];
    practicalInfo: {
        requirements: { text: string; icon: string }[];
        whatToBring: { text: string; icon: string }[];
        cancellation: string;
    };
}

const destinationSchema = new  mongoose.Schema<IDestination>(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String },
        badge: { type: String },
        description: { type: String, required: true },
        longDescription: { type: String },
        image: { type: [String] },
        href: { type: String },
        IdPage: { type: String },
        rating: { type: String },
        location: { type: String },
        price: { type: String },
        duration: { type: String },
        groupSize: { type: String },
        difficulty: { type: String },
        bestTime: { type: String },
        galleryImages: [
            {
                src: String,
                alt: String,
                title: String,
                description: String,
            },
        ],
        locationDetails: {
            address: String,
            coordinates: {
                lat: Number,
                lng: Number,
            },
            distance: String,
            access: String,
            nearby: [String],
        },
        detailedItinerary: [
            {
                time: String,
                title: String,
                description: String,
                duration: String,
                icon: String,
            },
        ],
        included: [String],
        notIncluded: [String],
        activities: [
            {
                name: String,
                icon: String,
                description: String,
                difficulty: String,
                duration: String,
            },
        ],
        highlights: [String],
        reviews: [
            {
                name: String,
                nationality: String,
                rating: Number,
                comment: String,
                date: String,
                verified: Boolean,
                helpful: Number,
            },
        ],
        practicalInfo: {
            requirements: [{ text: String, icon: String }],
            whatToBring: [{ text: String, icon: String }],
            cancellation: String,
        },
    },
    { timestamps: true }
);

export const Destination = mongoose.model<IDestination>("Destination",destinationSchema,"destinations");
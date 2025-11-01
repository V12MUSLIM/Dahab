export interface IExperience {
    IdPage: string;
    type: string;
    title: string;
    subtitle: string;
    description: string;
    fullDescription: string;
    images: string[];
    galleryImages: string[];
    badge: string;
    rating: string;
    totalReviews: number;

    location: string;
    locationDetails: {
        city: string;
        region: string;
        country: string;
        coordinates: { lat: number; lng: number };
        meetingPoint: string;
    };

    duration: string;
    durationMinutes: number;
    groupSize: string;
    minGroupSize: number;
    maxGroupSize: number;

    difficulty: string;
    difficultyLevel: number;
    minAge: number;

    price: string;
    priceAmount: number;
    currency: string;

    priceIncludes: string[];

    href: string;
    bookingUrl: string;
}


import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema<IExperience>(
    {
        IdPage: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true },
        fullDescription: { type: String, required: true },

        images: [{ type: String }],
        galleryImages: [{ type: String }],

        badge: String,
        rating: String,
        totalReviews: Number,

        location: String,
        locationDetails: {
            city: String,
            region: String,
            country: String,
            coordinates: {
                lat: Number,
                lng: Number,
            },
            meetingPoint: String,
        },

        duration: String,
        durationMinutes: Number,
        groupSize: String,
        minGroupSize: Number,
        maxGroupSize: Number,

        difficulty: String,
        difficultyLevel: Number,
        minAge: Number,

        price: String,
        priceAmount: Number,
        currency: String,

        priceIncludes: [String],

        href: String,
        bookingUrl: String,
    },
    { timestamps: true }
);


export const Experience = mongoose.model<IExperience>(
    "Experience",
    ExperienceSchema,
    "experience"
);
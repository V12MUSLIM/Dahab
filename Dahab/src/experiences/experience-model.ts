import mongoose from "mongoose";

interface Experience 
    {
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
            coordinates: {
                lat: number;
                lng: number;
            };
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

export interface IExperience {
    category: string;
    categoryId: string;
    description: string;
    experiences: Experience[];
}

const ExperienceSchema = new mongoose.Schema<Experience>({
        IdPage: { type: String, required: true },
        type: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true },
        fullDescription: { type: String, required: true },
        images: { type: [String], required: true },
        galleryImages: { type: [String], required: true },
        badge: { type: String, required: true },
        rating: { type: String, required: true },
        totalReviews: { type: Number, required: true },
        location: { type: String, required: true },
        locationDetails: {
            city: { type: String, required: true },
            region: { type: String, required: true },
            country: { type: String, required: true },
            coordinates: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
            },
            meetingPoint: { type: String, required: true }
        },
        duration: { type: String, required: true },
        durationMinutes: { type: Number, required: true },
        groupSize: { type: String, required: true },
        minGroupSize: { type: Number, required: true },
        maxGroupSize: { type: Number, required: true },
        difficulty: { type: String, required: true },
        difficultyLevel: { type: Number, required: true },
        minAge: { type: Number, required: true },
        price: { type: String, required: true },
        priceAmount: { type: Number, required: true },
        currency: { type: String, required: true },
        priceIncludes: { type: [String], required: true },
        href: { type: String, required: true },
        bookingUrl: { type: String, required: true },
    }
)
const ExperiencesSchema = new mongoose.Schema<IExperience>(
    {
        category: { type: String, required: true },
        categoryId: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        experiences: { type: [ExperienceSchema], required: true },
    },
    { timestamps: true }
);


export const Experience = mongoose.model<IExperience>(
    "Experience",
    ExperiencesSchema,
    "experiences"
);
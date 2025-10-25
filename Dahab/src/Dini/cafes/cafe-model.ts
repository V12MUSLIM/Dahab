import mongoose from "mongoose";

export interface ICafe {
    IdPage: string;
    title: string;
    category: string;
    subtitle: string;
    description: string;
    image: string;
    badge: string;
    priceValue: number;
    rating: string;
    location: string;
    price: string;
    buttonText: string;
    href: string;
    phone: string;
    email: string;
    website: string;

    openingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };

    menu: {
        name: string;
        price: string;
        description: string;
    }[];

    features: string[];
    gallery: string[];
    reviews: string[];
}


const CafeSchema = new mongoose.Schema<ICafe>({
    IdPage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        required: true
    },
    priceValue: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },

    openingHours: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true },
    },

    menu: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],

    features: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    reviews: { type: [String], default: [] },
});



export const Cafe = mongoose.model<ICafe>("Cafe", CafeSchema, "cafes");
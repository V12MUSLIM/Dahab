
export interface IRestaurant {
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
    gallery: {
        src: string;
        alt: string;
        title: string;
        description: string;
    }[];
    reviews: {
        name: string;
        rating: number;
        comment: string;
        date: string;
    }[];
}

import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema<IRestaurant>({
    IdPage: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    subtitle: String,
    description: String,
    image: String,
    badge: String,
    priceValue: Number,
    rating: String,
    location: String,
    price: String,
    buttonText: String,
    href: String,
    phone: String,
    email: String,
    website: String,
    openingHours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
    },
    menu: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    features: [String],
    gallery: [
        {
            src: String,
            alt: String,
            title: String,
            description: String,
        },
    ],
    reviews: [
        {
            name: String,
            rating: Number,
            comment: String,
            date: String,
        },
    ],
});

export const Restaurant = mongoose.model<IRestaurant>(
    "Restaurant",
    RestaurantSchema,
    "restaurants"
);

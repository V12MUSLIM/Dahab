
import mongoose from "mongoose";

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



const RestaurantSchema = new mongoose.Schema<IRestaurant>(
    {
        IdPage: {
            type: String,
            required: true
        },
        title: {
            type: String,required: true
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
                name: String,
                price: String,
                description: String,
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
    },
    { timestamps: true }
);

export const Restaurant = mongoose.model<IRestaurant>("Restaurant",RestaurantSchema,"restaurants");
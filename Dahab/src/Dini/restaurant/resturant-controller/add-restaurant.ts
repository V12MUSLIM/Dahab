
import { RequestHandler } from "express";
import { IRestaurant, Restaurant } from "../restaurant-model";

interface IRequest extends IRestaurant {
    
}

interface IResponse {
    message: string;
}

export const addRestaurant: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Restaurant.insertMany(req.body);
        } else {
            await Restaurant.create(req.body);
        }

        res.status(201).json({ message: "Restaurant(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding Restaurant" });
    }
}

/*IdPage: string;
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
    }[];*/

import { RequestHandler } from "express";
import { Restaurant } from "../restuarant-model";

interface IRequest {
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

interface IResponse {
    massege: string ;
}

export const addResturant: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Restaurant.insertMany(req.body);
        } else {
            await Restaurant.create(req.body);
        }

        res.status(201).json({ massege: "Resturant(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ massege: error.message || "Error adding Resturant" });
    }
}
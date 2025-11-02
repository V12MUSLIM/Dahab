import { RequestHandler } from "express";
import { Destination, IDestination } from "../destination-model";

interface IRequest extends IDestination {
    
}

export const addDestination: RequestHandler<{}, {}, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Destination.insertMany(req.body);
        } else {
            await Destination.create(req.body);
        }

        res.status(201).json({ message: "Destination(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding Destination" });
    }
}


/*
category: string;
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    longDescription: string;
    imageUrl: string;
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
*/
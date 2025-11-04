import mongoose from "mongoose";

interface Stay {
    IdPage: string;
    type: string;
    name: string;
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
        address: string;
        nearbyAttractions: {
            name: string;
            distance: string;
        }[];
    };
    checkInTime: string;
    checkOutTime: string;
    minStay: number;
    maxGuests: number;
    totalRooms: number;
    pricePerNight: number;
    currency: string;
    priceIncludes: string[];
    roomTypes: {
        name: string;
        size: string;
        beds: string;
        maxOccupancy: number;
        price: number;
        amenities: string[];
    }[];
    amenities: {
        general: string[];
        recreation: string[];
        wellness: string[];
        services: string[];
        dining: string[];
    };
    features: string[];
    policies: {
        cancellation: string;
        payment: string;
        children: string;
        pets: string;
        smoking: string;
        checkInFrom: string;
        checkInUntil: string;
        checkOut: string;
    };
    languages: string[];
    propertyType: string;
    starRating: number;
    yearBuilt: number;
    lastRenovated: number;
    href: string;
    bookingUrl: string;
}

export interface IStay {
    category: string;
    categoryId: string;
    description: string;
    stays: Stay[];
}

const StaySchema = new mongoose.Schema<Stay>({
    IdPage: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
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
        address: { type: String, required: true },
        nearbyAttractions: [
            {
                name: { type: String, required: true },
                distance: { type: String, required: true },
            },
        ],
    },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    minStay: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    currency: { type: String, required: true },
    priceIncludes: { type: [String], required: true },
    roomTypes: [
        {
            name: String,
            size: String,
            beds: String,
            maxOccupancy: Number,
            price: Number,
            amenities: [String],
        },
    ],
    amenities: {
        general: [String],
        recreation: [String],
        wellness: [String],
        services: [String],
        dining: [String],
    },
    features: [String],
    policies: {
        cancellation: String,
        payment: String,
        children: String,
        pets: String,
        smoking: String,
        checkInFrom: String,
        checkInUntil: String,
        checkOut: String,
    },
    languages: [String],
    propertyType: { type: String, required: true },
    starRating: { type: Number, required: true },
    yearBuilt: { type: Number, required: true },
    lastRenovated: { type: Number, required: true },
    href: { type: String, required: true },
    bookingUrl: { type: String, required: true },
});


const StaysSchema = new mongoose.Schema<IStay>(
    {
        category: { type: String, required: true },
        categoryId: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        stays: { type: [StaySchema], required: true },
    },
    { timestamps: true }
);

export const Stay = mongoose.model<IStay>(
    "Stay",
    StaysSchema,
    "stays"
);

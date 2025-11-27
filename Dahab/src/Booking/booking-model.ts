import { IExperience } from "../experiences/experience-model";
import { IDestination } from "../home/Destinations/destination-model";
import mongoose, { Types } from "mongoose";
import { IStay } from "../stay/stay-model";
import { IRestaurant } from "../Dini/restaurant/restaurant-model";

export interface IBooking {
    userId: Types.ObjectId;

    tripDetails: {
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
    };

    services: (IExperience | IDestination | IStay|IRestaurant)[];

    userInfo: {
        name: string;
        phone: string;
        email: string;
        specialRequests?: string;
    };

    paymentDetails: {
        paymentIntentId: string;  // من Stripe
        status: "pending" | "processing" | "succeeded" | "failed";
        amount: number;
        currency: string;
    };

    phase:
    | "trip-details"
    | "select-services"
    | "personal-info"
    | "review&Details"
    | "payment"
    | "completed";

    createdAt: Date;
    updatedAt: Date;
}
const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },

        tripDetails: {
            checkIn: { type: Date, required: true },
            checkOut: { type: Date, required: true },
            adults: { type: Number, required: true },
            children: { type: Number, default: 0 },
        },

        services: [
            {
                item: { 
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: "services.kind" },
                kind: { 
                    type: String, 
                    required: true,
                    enum: ["Destination", "Experience", "Stay","Restaurant"] }
            }
        ]
        ,

        userInfo: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
            specialRequests: { type: String },
        },

        paymentDetails: {
            paymentIntentId: { type: String, required: true },
            status: {
                type: String,
                enum: ["pending", "processing", "succeeded", "failed"],
                default: "pending",
            },
            amount: { type: Number, required: true },
            currency: { type: String, default: "usd" },
        },

        phase: {
            type: String,
            enum: [
                "trip-details",
                "select-services",
                "personal-info",
                "review&Details",
                "payment",
                "completed",
            ],
            default: "trip-details",
        },
    },
    { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);

import { RequestHandler } from "express";
import { Booking, IBooking } from "./booking-model";


interface IResponse {
    message: string
}

export const addBooking:RequestHandler<{},IResponse> = async (req, res) => {
    try{
        await Booking.create({
            ...req.body,
            paymentDetails: {
                paymentIntentId: "",
                status: "pending",
                amount:req.body.amount,
                currency: "usd",
            }
        });
        res.status(201).json({message:"Booking added successfully"});

    } catch (error: any) {
        res.status(500).json({message:error.message || "Error adding Booking"});
    }
}
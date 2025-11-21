import { Request, Response } from "express";
import Stripe from "stripe";
import { Booking } from "../booking-model"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;

        // 1) Get Booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2) Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: booking.userInfo!.email,
            line_items: [
                {
                    price_data: {
                        currency: booking.paymentDetails!.currency,
                        product_data: {
                            name: "Booking Payment",
                        },
                        unit_amount: booking.paymentDetails!.amount * 100, // USD → cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/payment-success?bookingId=${bookingId}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-failed?bookingId=${bookingId}`,
        });

        // 3) Return Session URL
        return res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Session Error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

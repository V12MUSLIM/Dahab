import { Request, Response } from "express";
import Stripe from "stripe";
import { Booking } from "../booking-model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful checkout session
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        const bookingId = session.success_url.split("bookingId=")[1];

        await Booking.findByIdAndUpdate(bookingId, {
            "paymentDetails.status": "succeeded",
            phase: "completed",
        });

        console.log("Booking Updated Successfully");
    }

    res.json({ received: true });
};

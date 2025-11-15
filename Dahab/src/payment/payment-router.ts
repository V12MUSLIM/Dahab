import express from "express";
import Stripe from "stripe";
import "dotenv/config";
import { Payment } from "./payment-model";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post("/create", async (req, res) => {
    try {
        const { userId, amount, currency } = req.body;

        if (!userId || !amount) {
            return res.status(400).json({ message: "userId and amount are required" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: currency || "usd",
            automatic_payment_methods: { enabled: true },
        });

        const payment = await Payment.create({
            userId,
            amount,
            currency: currency || "usd",
            status: "pending",
            method: "stripe",
            transactionId: paymentIntent.id,
        });

        res.status(201).json({
            message: "Payment intent created",
            clientSecret: paymentIntent.client_secret,
            payment,
        });
    } catch (err) {
        console.error("Payment error:", err);
        res.status(500).json({ message: "Payment creation failed", error: err });
    }
});

export default router;

// import express from "express";
// const router = express.Router();
// import { buffer } from "micro"; // أو استخدم express.raw middleware

// // فى app.ts: app.use("/webhook", express.raw({ type: "application/json" }));

// router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
//     const sig = req.headers["stripe-signature"] as string | undefined;
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
//     } catch (err) {
//         console.error("Webhook signature verification failed.", err);
//         return res.status(400).send(`Webhook Error: ${err}`);
//     }

//     // Handle the event
//     switch (event.type) {
//         case "payment_intent.succeeded": {
//             const pi = event.data.object as Stripe.PaymentIntent;
//             // find payment by transactionId (paymentIntent.id)
//             const payment = await Payment.findOneAndUpdate(
//                 { transactionId: pi.id },
//                 { status: "succeeded" },
//                 { new: true }
//             ).populate("userId", "name email");

//             // Update Booking status if linked (bookingId in metadata)
//             const bookingId = pi.metadata?.bookingId;
//             if (bookingId) {
//                 await Booking.findByIdAndUpdate(bookingId, { status: "confirmed" });
//             }

//             // optional: send email, create invoice, etc.
//             break;
//         }

//         case "payment_intent.payment_failed": {
//             const pi = event.data.object as Stripe.PaymentIntent;
//             await Payment.findOneAndUpdate({ transactionId: pi.id }, { status: "failed" });
//             break;
//         }

//         // handle other events if needed
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     res.json({ received: true });
// });

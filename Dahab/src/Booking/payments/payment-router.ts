import { Router } from "express";
import { createCheckoutSession } from "./payment-controller";
import { stripeWebhook } from "./payment-webhook";

const router = Router();

router.post("/create-checkout-session/:bookingId", createCheckoutSession);
router.post("/webhook", stripeWebhook);

export default router;

import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./src/auth/auth.router";
import passport from './src/config/passport';
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
//       start imports routers
import packagesRouter from './src/home/packages/package-router'
import activitiesRouter from "./src/home/activities/activities-router";
import destinationRouter from "./src/home/Destinations/destination-router"
import heroRouter from "./src/home/heros/hero-router";
import cafeRouter from "./src/Dini/cafes/cafe-router";
import experienceRouter from "./src/experiences/experience-router";
import contactRouter from "./src/contact/contact-router";
import stayRouter from "./src/stay/stay-router";
import socialMediaRouter from "./src/social-media/social-media-router";
import restaurantRouter from "./src/Dini/restaurant/restaurant-router";
import paymentRouter from "./src/Booking/payments/payment-router";
// import { uploadSingle, uploadArray } from "./src/middlewares/multer-middleware";
import bookingRouter from "./src/Booking/booking-router";
//       end imports routers
import { sanitizeInput } from "./src/middlewares/sanitize.middleware";
// import session from "express-session";
import { stripeWebhook } from "./src/Booking/payments/payment-webhook";



dotenv.config();
const PORT = Number(process.env.PORT);
const URI = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
mongoose.connect(`${URI}/${DB_NAME}`)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);

        process.exit(1);
    });

const app = express();



// app.use(
//     session({
//         secret: process.env.SESSION_SECRET || "supersecret",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             httpOnly: true,
//             secure: false,
//             maxAge: 24 * 60 * 60 * 1000,
//         },
//     })
// );
app.use(passport.initialize());
// app.use(passport.session());

app.use(morgan("dev"));
app.use(helmet());

const corsOptions = {
    origin:
        process.env.FRONTEND_URL ||
        "http://localhost:5173" ||
        "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, try again later.",
        standardHeaders: true,
        legacyHeaders: false,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);
app.use(compression(
    {
        level: 6,
        threshold: 1000,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    }
));
// routes
app.use("/api/auth", authRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/destination", destinationRouter);
app.use("/api/hero", heroRouter);
app.use("/api/ccccccccccccccccc", restaurantRouter);
app.use("/api/cafe", cafeRouter);
app.use("/api/experience", experienceRouter)
app.use("/api/stay", stayRouter)
app.use("/api/contact", contactRouter)
app.use("/api/social-media", socialMediaRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/payment", paymentRouter)
app.post(
    "/api/payments/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message ?? "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

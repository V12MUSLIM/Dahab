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
import packagesRouter from './src/home/packages/package-router'
import activitiesRouter from "./src/home/activities/activities-router";
import destinationRouter from "./src/home/Destination/destination-router"
import heroRouter from "./src/home/hero/hero-router";
import resturantRouter from './src/Dini/restaurant/restuarant-router';
import { sanitizeInput } from "./src/middlewares/sanitize.middleware";
import session from "express-session";

dotenv.config();

const PORT = Number(process.env.PORT);
const URI = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`${URI}/${DB_NAME}`)
    .then(() => console.log("MongoDB connected",`${URI}/${DB_NAME}`))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        
        // process.exit(1);
    });

const app = express();


app.use(helmet());
// app.use(
//     cors({
//         origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:5173"],
//         credentials: true,
//     })
// );
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET || "supersecret",
//         resave: false,
//         saveUninitialized: false,
//     })
// )
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000, 
        },
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, try again later.",
    })
);
app.use(sanitizeInput);
// routes
app.use("/api/auth", authRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/destination", destinationRouter);
app.use("/api/hero", heroRouter);
app.use("/api/resturant", resturantRouter);

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

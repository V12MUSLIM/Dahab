import express, { Request, Response } from "express";
import passport from "../config/passport";

import { registerHandler } from "./registerHandler";
import { loginHandler } from "./login.handler";
import { logoutHandler } from "./logout";

const router = express.Router();


router.post("/register", registerHandler);

router.post("/login", loginHandler);


router.get("/logout", logoutHandler);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    }),
    (req: Request, res: Response) => {
        res.redirect(`${process.env.FRONTEND_URL}/home`);
    }
);


router.get("/me", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false, error: "Not authenticated" });
    }
});


router.get("/status", (req: Request, res: Response) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user : null,
    });
});

export default router;
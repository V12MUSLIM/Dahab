import express, { Request, Response } from "express";
import passport from "../config/passport";
import { uploadSingle, uploadArray } from "../middlewares/multer-middleware";
import { registerHandler } from "./register-controller";
import { loginHandler } from "./login-controller";
import { logoutHandler } from "./logout-controller";
import { refreshTokenHandler } from "./refresh-controller";

const router = express.Router();

router.post("/register", uploadSingle("picture"), registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshTokenHandler);
router.post("/register", registerHandler);
router.delete("/logout", logoutHandler);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    }),
    (req: Request, res: Response) => {
        res.redirect(`${process.env.FRONTEND_URL}/#/auth/callback`);
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
import express, { Request, Response } from "express";
import { registerHandler } from "./register-controller";
import { loginHandler, loginValidation } from "./login-controller";
import { logoutHandler } from "./logout-controller";
import { refreshTokenHandler } from "./refresh-controller";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import jwtService from "../services/jwt.service";
import { COOKIE_OPTIONS } from "../utils/cookieOptions";
import passport from "../config/passport-jwt";

const router = express.Router();

router.post("/login", loginHandler);
router.post("/refresh", refreshTokenHandler);
router.post("/register", registerHandler);
router.delete("/logout", logoutHandler);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
);

// Step 2: Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/#/login?error=auth_failed`,
    }),
    async (req: Request, res: Response) => {
        try {
            console.log("=== Google Callback Debug ===");
            console.log("req.user:", req.user);

            const user: any = req.user;

            if (!user) {
                console.error("❌ No user found in req.user");
                return res.redirect(`${process.env.FRONTEND_URL}/#/login?error=no_user`);
            }

            console.log("✅ User found:", { id: user._id, email: user.email });

            const token = jwtService.createToken(
                { id: user._id, email: user.email },
                { expiresIn: "2h" }
            );

            const refreshToken = jwtService.createToken(
                { id: user._id, email: user.email },
                { expiresIn: "7d" }
            );

            console.log("✅ Tokens created");

            res.cookie("token", token, {
                ...COOKIE_OPTIONS,
                maxAge: 2 * 60 * 60 * 1000,
            });

            res.cookie("refreshToken", refreshToken, {
                ...COOKIE_OPTIONS,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            console.log("✅ Cookies set, redirecting...");

            res.redirect(`${process.env.FRONTEND_URL}/#/auth/callback`);
        } catch (err) {
            console.error("❌ Google OAuth callback error:", err);
            console.error("Error stack:", err instanceof Error ? err.stack : err);
            res.redirect(`${process.env.FRONTEND_URL}/#/login?error=server_error`);
        }
    }
);

router.get("/me", (req, res) => {
    res.json({ success: true, user: req.user });
});

router.get("/status", (req: Request, res: Response) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user : null,
    });
});

export default router;

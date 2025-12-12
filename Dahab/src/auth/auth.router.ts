import express, { Request, Response } from "express";
import { registerHandler } from "./register-controller";
import { loginHandler, loginValidation } from "./login-controller";
import { logoutHandler } from "./logout-controller";
import { refreshTokenHandler } from "./refresh-controller";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import jwtService from "../services/jwt.service";
import { COOKIE_OPTIONS } from "../utils/cookieOptions";
import passport from "../config/passport-jwt";
import jwtAuth from "./jwt"; // JWT middleware
import { User } from "../models/user-model";

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

// Google Callback
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
                { id: user._id, email: user.email, role: user.role },
                { expiresIn: "2h" }
            );

            const refreshToken = jwtService.createToken(
                { id: user._id, email: user.email, role: user.role },
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

// Protected route with JWT middleware
router.get("/me", jwtAuth, (req, res) => {
    res.json({ success: true, user: req.user });
});

// ✅ FIXED: Status endpoint reads token from cookie, not Authorization header
router.get("/status", async (req: Request, res: Response) => {
    try {
        // Get token from cookie (not from Authorization header)
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                user: null,
                accessToken: null 
            });
        }

        // Verify token
        const decoded = jwtService.verifyToken<{ id: string; email: string; role: string }>(token);

        if (!decoded) {
            return res.status(401).json({ 
                user: null,
                accessToken: null 
            });
        }

        // Fetch user from database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ 
                user: null,
                accessToken: null 
            });
        }

        // Return user and token
        const userResponse = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            picture: user.picture
        };

        return res.json({
            user: userResponse,
            accessToken: token,
        });
    } catch (error) {
        console.error("Status check error:", error);
        return res.status(401).json({ 
            user: null,
            accessToken: null 
        });
    }
});

export default router;
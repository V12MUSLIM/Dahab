import express, { Request, Response } from "express";
import passport from "../config/passport";
import { registerHandler } from "./register-controller";
import { loginHandler, loginValidation } from "./login-controller";
import { logoutHandler } from "./logout-controller";
import { refreshTokenHandler } from "./refresh-controller";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import jwtAuth from "./jwt";
import { jwtService } from "../services/jwt.service";

const router = express.Router();

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

router.post("/login", loginValidation, handleValidationErrors, loginHandler);
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
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    failureMessage: true,
  }),
  (req: Request, res: Response) => {
    try {
      const user = req.user as any;

      // Create JWT tokens for Google OAuth users
      const token = jwtService.createToken(
        { id: user._id, email: user.email, role: user.role },
        { expiresIn: "2h" }
      );

      const refreshToken = jwtService.createToken(
        { id: user._id, email: user.email, role: user.role },
        { expiresIn: "7d" }
      );

      // FIXED: Set cookies with proper options
      res.cookie("token", token, {
        ...COOKIE_OPTIONS,
        maxAge: 2 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${process.env.FRONTEND_URL}/#/auth/callback`);
    } catch (error) {
      console.error("Google callback error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

// FIXED: Protected route with proper error handling
router.get("/me", (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  try {
    const decoded = jwtService.verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, error: "Authentication failed" });
  }
});

router.get("/status", (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      authenticated: false,
      user: null,
    });
  }

  try {
    const user = jwtService.verifyToken(token);
    res.json({
      authenticated: !!user,
      user: user || null,
    });
  } catch (error) {
    res.json({
      authenticated: false,
      user: null,
    });
  }
});

export default router;
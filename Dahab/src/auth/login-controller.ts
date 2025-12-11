import { RequestHandler } from "express";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";
import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

// CONSISTENT COOKIE OPTIONS - Use everywhere
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
    | "none"
    | "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return next({
        status: 400,
        message: "Missing credentials",
      });
    }

    const user = await User.findOne({ email }).select("+password").exec();
    if (!user || !user.password) {
      return next({
        status: 401,
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({
        status: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwtService.createToken(
      { id: user._id, email: user.email, role: user.role },
      { expiresIn: "2h" }
    );

    const refreshToken = jwtService.createToken(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      { expiresIn: "7d" }
    );

    // Set cookies
    res.cookie("token", token, {
      ...COOKIE_OPTIONS,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // ✅ FIXED: Return accessToken in response body for frontend
    return res.json({
      message: "Logged in successfully",
      user: userResponse,
      accessToken: token, // Frontend needs this!
    });
  } catch (err) {
    next(err);
  }
};

// Export COOKIE_OPTIONS for use in other controllers
export { COOKIE_OPTIONS };
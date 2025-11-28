
//loginHandler

import { RequestHandler } from "express";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";
import { body } from "express-validator";


export const loginValidation = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .notEmpty().withMessage("Password is required"),
];

export const loginHandler: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

        const user = await User.findOne({ email }).select("+password").exec();
        if (!user || !user.password) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwtService.createToken({ id: user._id, email: user.email, role: user.role }, { expiresIn: "2h" });
        const refreshToken = jwtService.createToken(
            { id: user._id },
            { expiresIn: "7d" }
);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 2 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
});
        return res.json({ message: "Logged in successfully" });
    } catch (err) {
        next(err);
    }
};
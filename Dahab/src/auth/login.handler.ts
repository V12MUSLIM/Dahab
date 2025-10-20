
import { RequestHandler } from "express";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";

export const loginHandler: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

        const user = await User.findOne({ email }).select("+password").exec();
        if (!user || !user.password) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwtService.createToken({ id: user._id, email: user.email, role: user.role }, { expiresIn: "2h" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
        });
        return res.json({ message: "Logged in successfully" });
    } catch (err) {
        next(err);
    }
};
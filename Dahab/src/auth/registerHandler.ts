import { RequestHandler } from "express";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";
// import { emailService } from "../services/emailService";


export const registerHandler: RequestHandler = async (req, res, next) => {
    try {
        const { email, password, username } = req.body as { email: string; password: string; username: string; };
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (password.length < 6) return res.status(400).json({ message: "Password too short" });

        const user = await User.findOne({ email }).exec();
        if (user) return res.status(409).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashed, username });
        await newUser.save();

        const token = jwtService.createToken({ id: newUser._id, email: newUser.email }, { expiresIn: "3d" });
        // await emailService.sendEmailVerificationLink(newUser.email,token);

        return res.status(201).json({ message: "register successful" });
    } catch (err) {
        next(err);
    }
};

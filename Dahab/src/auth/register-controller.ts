import { RequestHandler } from "express";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";
import { body } from "express-validator";
import { emailService } from "../services/emailService";

export const registerValidation = [
        body("name")
                .trim()
                .notEmpty().withMessage("Name is required")
                .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),

        body("email")
                .trim()
                .notEmpty().withMessage("Email is required")
                .isEmail().withMessage("Invalid email format"),

        body("password")
                .notEmpty().withMessage("Password is required")
                .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const registerHandler: RequestHandler = async (req, res, next) => {
        try {
                // const { email, password, name  } = req.body as { email: string; password: string; name: string;picture?:string };

                const { email, password, name } = req.body as { email: string; password: string; name: string; };

                if (!email || !password || !name) {
                        return res.status(400).json({ message: "Missing required fields" });
                }


                const user = await User.findOne({ email }).exec();
                if (user) return res.status(409).json({ message: "Email already registered" });


                // const picture = req.file ? `/uploads/${req.file.filename}` : undefined
                const hashed = await bcrypt.hash(password, 10);
                const newUser = new User({ email, password: hashed, name /*, picture:picture ||" "*/ });
                // console.log(picture);


                await newUser.save();

                const token = jwtService.createToken(
                        { id: newUser._id, email: newUser.email },
                        { expiresIn: "3d" }
                );
                await emailService.sendEmailVerificationLink(newUser.email, token);


                return res.status(201).json({ message: "register successful" ,newUser});
        } catch (err) {
                next(err);
        }
};

import { RequestHandler } from "express";
import { User } from "../models/user-model";
import { jwtService } from "../services/jwt.service";

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export const refreshTokenHandler: RequestHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwtService.verifyToken<{ id: string; email: string; role: string }>(refreshToken);
        
        if (!decoded) {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = jwtService.createToken(
            { id: user._id, email: user.email, role: user.role },
            { expiresIn: "2h" }
        );

        // FIXED: Using consistent cookie options
        res.cookie("token", newAccessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 2 * 60 * 60 * 1000,
        });

        return res.json({ message: "Access token refreshed successfully" });
    } catch (err) {
        console.error("Refresh token error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};






// import { RequestHandler } from "express";
// import { User } from "../models/user-model";
// import { jwtService } from "../services/jwt.service";

// export const refreshTokenHandler: RequestHandler = async (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
//         if (!refreshToken)
//             return res.status(401).json({ message: "No refresh token provided" });

//         const decoded = jwtService.verifyToken<{ id: string; email: string; role: string }>(refreshToken);
//         if (!decoded)
//             return res.status(403).json({ message: "Invalid or expired refresh token" });

//         const user = await User.findById(decoded.id);
//         if (!user)
//             return res.status(404).json({ message: "User not found" });

//         const newAccessToken = jwtService.createToken(
//             { id: user._id, email: user.email, role: user.role },
//             { expiresIn: "2h" }
//         );

//         res.cookie("token", newAccessToken, {
//             httpOnly: true,
//             sameSite: "strict",
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 2 * 60 * 60 * 1000,
//         });

//         return res.json({ message: "Access token refreshed successfully" });
//     } catch (err) {
//         console.error("Refresh token error:", err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

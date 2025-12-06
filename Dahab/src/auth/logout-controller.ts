// logoutController
import { RequestHandler } from "express";

interface IResponse {
    message: string;
}

export const logoutHandler: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    try {
        if (req.isAuthenticated && req.isAuthenticated()) {
            if (typeof (req as any).logout === "function") {
                await new Promise<void>((resolve, reject) => {
                    (req as any).logout((err: any) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            if (req.session) {
                req.session.destroy(() => { });
            }

            res.clearCookie("connect.sid");
            return res.json({ message: "Logout successful google account" });
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });
        // res.clearCookie("token");
        // res.clearCookie("refreshToken");
        return res.json({ message: "Logout successful with email account" });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Logout failed" });
    }
};



// import { RequestHandler } from "express";

// interface IResponse {
//     message: string;
// }

// // Use the same cookie options as login
// const COOKIE_OPTIONS = {
//     httpOnly: true,
//     sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
// };

// export const logoutHandler: RequestHandler<{}, IResponse, {}> = async (req, res) => {
//     try {
//         // Handle Google OAuth logout
//         if (req.isAuthenticated && req.isAuthenticated()) {
//             if (typeof (req as any).logout === "function") {
//                 await new Promise<void>((resolve, reject) => {
//                     (req as any).logout((err: any) => {
//                         if (err) return reject(err);
//                         resolve();
//                     });
//                 });
//             }

//             if (req.session) {
//                 req.session.destroy(() => { });
//             }

//             res.clearCookie("connect.sid", COOKIE_OPTIONS);
//         }

//         // FIXED: Clear cookies with SAME options as when they were set
//         res.clearCookie("token", COOKIE_OPTIONS);
//         res.clearCookie("refreshToken", COOKIE_OPTIONS);

//         return res.json({ message: "Logout successful" });
//     } catch (err) {
//         console.error("Logout error:", err);
//         res.status(500).json({ message: "Logout failed" });
//     }
// };


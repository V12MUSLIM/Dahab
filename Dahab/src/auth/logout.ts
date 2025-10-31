import { RequestHandler } from "express";

interface IResponse{
    message:string
} 


export const logoutHandler: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    try {
        // Passport logout (does not destroy session cookie by itself)
        if (typeof (req as any).logout === "function") {
            (req as any).logout(() => {});
        }

        // Destroy express-session session
        if (req.session) {
            req.session.destroy(() => {});
        }

        // Clear common cookies (session + any custom token)
        res.clearCookie("connect.sid");
        res.clearCookie("token");

        res.json({ message: "Logout successful" });
    } catch {
        res.json({ message: "Logout successful" });
    }
};

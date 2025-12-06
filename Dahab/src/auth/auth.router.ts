import express, { Request, Response } from "express";
import passport from "../config/passport";
// import { uploadSingle, uploadArray } from "../middlewares/multer-middleware";
import { registerHandler } from "./register-controller";
import { loginHandler, loginValidation } from "./login-controller";
import { logoutHandler } from "./logout-controller";
import { refreshTokenHandler } from "./refresh-controller";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import jwtService from "../services/jwt.service";
import { COOKIE_OPTIONS } from "../utils/cookieOptions";
import jwtAuth from "./jwt";

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, loginHandler);
router.post("/refresh", refreshTokenHandler);
router.post("/register", registerHandler);
router.delete("/logout", logoutHandler);

router.get(
"/google",
passport.authenticate("google", { scope: ["profile", "email"] })
);


// Step 2: Google Callback
router.get(
"/google/callback",
passport.authenticate("google", {
session: false,
failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
}),
async (req: Request, res: Response) => {
try {
const user: any = req.user;


const token = jwtService.createToken(
{ id: user._id, email: user.email },
{ expiresIn: "2h" }
);


const refreshToken = jwtService.createToken(
{ id: user._id, email: user.email },
{ expiresIn: "7d" }
);


res.cookie("token", token, {
...COOKIE_OPTIONS,
maxAge: 2 * 60 * 60 * 1000,
});


res.cookie("refreshToken", refreshToken, {
...COOKIE_OPTIONS,
maxAge: 7 * 24 * 60 * 60 * 1000,
});


res.redirect(`${process.env.FRONTEND_URL}/#/auth/callback`);
} catch (err) {
console.error(err);
res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
}
}
);


// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//         prompt: "select_account",
//     })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         failureRedirect: "/login",
//         failureMessage: true,
//     }),
//     (req: Request, res: Response) => {
//         res.redirect(`${process.env.FRONTEND_URL}/#/auth/callback`);
//     }
// );


router.get("/me", (req, res) => {
    res.json({ success: true, user: req.user });
});

router.get("/status", (req: Request, res: Response) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user : null,
    });
});

export default router;
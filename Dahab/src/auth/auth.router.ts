import express from "express";
import { registerHandler } from "./registerHandler";
// import { verifyHandler } from "./verifyHandler";
import { loginHandler } from "./login.handler";
import { logoutHandler } from "./logout";
// import { handleValidationErrors } from "../middlewares/handleValidationErrors";
const router = express.Router();

router.post("/register",registerHandler);

// router.get("/verify/:email/:token", verifyHandler);

router.post("/login",loginHandler);

router.get("/logout", logoutHandler);

export default router;

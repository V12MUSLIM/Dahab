import express from "express";
import { createBooking } from "./create-booking";




const router = express.Router();




router.post('/create', createBooking)




export default router
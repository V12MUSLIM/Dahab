import express from "express";
import { addBooking } from "./add-booking";




const router = express.Router();

router.get('/',addBooking)










export default router
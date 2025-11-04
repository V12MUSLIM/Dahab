import express from 'express'
import { getStay } from "./stay-controller/get-stay";
import { addStay } from "./stay-controller/add-stay";


const router = express.Router();

router.post('/add', addStay)
router.get('/', getStay)

export default router
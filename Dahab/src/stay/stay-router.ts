import express from 'express'
import { getStay } from "./stay-controller/get-stay";
import { addStay } from "./stay-controller/add-stay";
import { deleteStay } from './stay-controller/delete-stay';
import { updateStays } from './stay-controller/update-stay';


const router = express.Router();
router.get('/', getStay)
router.post('/add', addStay)
router.put('/update/:id', updateStays)
router.delete('/delete/:id', deleteStay)
export default router
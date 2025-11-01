import express from 'express'
import { getExperience } from "./experience-controller/get-experience";
import { addExperience } from "./experience-controller/add-experience";

const router = express.Router()

router.post('/add', addExperience)
router.get('/', getExperience)






export default router
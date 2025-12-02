import express from 'express'
import { getExperience } from "./experience-controller/get-experience";
import { addExperience } from "./experience-controller/add-experience";
import { updatedExperience } from './experience-controller/update-experience';
import { deleteExperience } from './experience-controller/delete-experience';

const router = express.Router()


router.get('/', getExperience)
router.post('/add', addExperience)
router.put('/update/:id',updatedExperience)
router.delete('/delete/:id',deleteExperience)







export default router
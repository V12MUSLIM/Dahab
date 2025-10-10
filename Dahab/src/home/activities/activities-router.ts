import express from 'express'
import { addActivities } from './activities-handlers/add-activities';
import { getActivities } from './activities-handlers/get-activities';


const router=express.Router();



router.post('/add',addActivities)
router.get('/',getActivities)


export default router
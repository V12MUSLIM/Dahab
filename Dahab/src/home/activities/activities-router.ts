import express from 'express'
import { addActivities } from './activities-controller/add-activities';
import { getActivities } from './activities-controller/get-activities';
// import { isAuthorized } from '../../middlewares/isAuthorized.middleware';
// import { Role } from '../../models/user-model';


const router=express.Router();



router.post('/add',addActivities)
router.get('/',getActivities)


export default router
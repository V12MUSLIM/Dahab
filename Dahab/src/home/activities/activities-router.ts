import express from 'express'
import { addActivities } from './activities-controller/add-activities';
import { getActivities } from './activities-controller/get-activities';
import { deleteActivities } from './activities-controller/delete-activities';
import { updateActivities } from './activities-controller/update-activities';
// import { isAuthorized } from '../../middlewares/isAuthorized.middleware';
// import { Role } from '../../models/user-model';


const router=express.Router();



router.post('/add',addActivities)
router.get('/',getActivities)
router.delete('/delete/:id',deleteActivities)
router.put('/update/:id',updateActivities)


export default router
import express,{Router} from 'express'
import { allPackages } from './packages-controller/get-packages';
import { addPackage } from './packages-controller/add-package';
import { updatePackages } from './packages-controller/update-packages';
import { deletepackages } from './packages-controller/delete-package';



const router=express.Router();


router.get('/',allPackages)
router.post('/add',addPackage)
router.put('/update/:id',updatePackages)
router.delete('/delete/:id',deletepackages)





export default router;
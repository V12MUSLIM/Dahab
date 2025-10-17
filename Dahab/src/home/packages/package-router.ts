import express,{Router} from 'express'
import { allPackages } from './packages-controller/get-packages';
import { addPackage } from './packages-controller/add-package';



const router=express.Router();


router.get('/',allPackages)
router.post('/add',addPackage)





export default router;
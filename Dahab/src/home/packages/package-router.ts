import express,{Router} from 'express'
import { allPackages } from './packages-handlers/get-packages';
import { addPackage } from './packages-handlers/add-package';



const router=express.Router();


router.get('/',allPackages)
router.post('/add',addPackage)





export default router;
import  express  from "express";
import { getCafes } from "./cafe-controller/get-cafes";
import { addCafe } from "./cafe-controller/add-cafes";
import { deleteCafe } from "./cafe-controller/delete-cafe";
import { updateCafe } from "./cafe-controller/update-cafe";



const router = express.Router();


router.get('/',getCafes)  // edited
router.post('/add',addCafe)
router.put('/update/:id',updateCafe)
router.delete('/delete/:id',deleteCafe)









export default router
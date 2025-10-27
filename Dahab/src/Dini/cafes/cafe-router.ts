import  express  from "express";
import { getCages } from "./cafe-controller/get-cafes";
import { addCafe } from "./cafe-controller/add-cafes";



const router = express.Router();


router.get('/',getCages)
router.post('/add',addCafe)









export default router
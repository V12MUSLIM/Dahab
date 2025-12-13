import  express  from "express";
import { getBanner } from "./bannar-controller/get-bannar";
import { updateBanner } from "./bannar-controller/update-bannar";
import { addBanner } from "./bannar-controller/add-banner";

const router = express.Router();

router.get('/',getBanner)
router.post('/add',addBanner)
router.put('/update/:id',updateBanner)

export default router
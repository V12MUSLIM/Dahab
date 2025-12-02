
import express from 'express'
import { addHero } from './hero-controller/add-hero';
import { getHero } from './hero-controller/get-hero';
import { deleteHero } from './hero-controller/delete-hero';
import { updateHero } from './hero-controller/update-hero';




const router = express.Router();


router.get("/:section",getHero)
router.post('/add',addHero)
router.put('/update/:id',updateHero)
router.delete("/delete/:id",deleteHero)





export default router;

import express from 'express'
import { addHero } from './hero-controller/add-hero';
import { getHero } from './hero-controller/get-hero';




const router = express.Router();

router.post('/add',addHero)
router.get("/:section",getHero)





export default router;
import express from 'express';
import { addSocialMedia } from './social-media-controller/add-social-media';
import { getSocialMedia } from './social-media-controller/get-social-media';
import { updateSocialMedia } from './social-media-controller/update-social-media';
const router = express.Router();

router.post('/add',addSocialMedia)
router.get('/',getSocialMedia)
router.put('/update',updateSocialMedia)

export default router
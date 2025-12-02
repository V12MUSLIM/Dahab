import express from 'express';
import { addSocialMedia } from './social-media-controller/add-social-media';
import { getSocialMedia } from './social-media-controller/get-social-media';
import { updateSocialMedia } from './social-media-controller/update-social-media';
import { deleteSocialMedia } from './social-media-controller/delete-social-media';
const router = express.Router();


router.get('/',getSocialMedia)
router.post('/add',addSocialMedia)
router.put('/update/:id',updateSocialMedia)
router.delete('/delete/:id',deleteSocialMedia)

export default router
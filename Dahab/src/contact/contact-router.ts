import express from 'express';
import { addContact } from './contact-controller/add-contact';
import { getContact } from './contact-controller/get-contact';
import { updateContact } from './contact-controller/update-contact';
const router = express.Router();


router.post('/add',addContact)
router.get('/',getContact)
router.put('/update/:id',updateContact)


export default router
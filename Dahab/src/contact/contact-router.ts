import express from 'express';
import { addContact } from './contact-controller/add-contact';
import { getContact } from './contact-controller/get-contact';
import { updateContact } from './contact-controller/update-contact';
import { deleteContact } from './contact-controller/delete-contact';
const router = express.Router();


router.post('/add',addContact)
router.get('/',getContact)
router.put('/update/:id',updateContact)
router.delete('/delete/:id',deleteContact)


export default router
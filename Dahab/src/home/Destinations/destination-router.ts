import express from 'express'
import { addDestination } from './destination-controller/add-destination'
import { getDestination } from './destination-controller/get-destinations'
import upload from '../../middlewares/multer-middleware'
import { deleteDestination } from './destination-controller/delete-destination'
import { updateDestination } from './destination-controller/update-destination'




const router = express.Router()

// router.post('/add',
//     upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "galleryImages", maxCount: 5 },
// ]),addDestination);
router.get('/', getDestination)
router.post('/add', addDestination)
router.put('/update/:id', updateDestination)
router.delete('/delete/:id', deleteDestination)


export default router
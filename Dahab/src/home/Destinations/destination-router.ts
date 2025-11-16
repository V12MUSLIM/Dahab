import express from 'express'
import { addDestination } from './destination-controller/add-destination'
import { getDestination } from './destination-controller/get-destinations'
<<<<<<< HEAD
=======
import upload from '../../middlewares/multer-middleware'
>>>>>>> be3d324316f26fb053a31b0c983d3d287c60dc6f



const router = express.Router()

<<<<<<< HEAD
=======
router.post('/add',
    upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
]),
    addDestination);

    router.get('/', getDestination);

>>>>>>> be3d324316f26fb053a31b0c983d3d287c60dc6f
router.post('/add', addDestination)
router.get('/', getDestination)








<<<<<<< HEAD

=======
>>>>>>> be3d324316f26fb053a31b0c983d3d287c60dc6f
export default router
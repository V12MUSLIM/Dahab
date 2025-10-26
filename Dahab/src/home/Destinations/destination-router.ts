import express from 'express'
import { addDestination } from './destination-controller/add-destination'
import { getDestination } from './destination-controller/get-destinations'



const router = express.Router()

router.post('/add', addDestination)
router.get('/', getDestination)









export default router
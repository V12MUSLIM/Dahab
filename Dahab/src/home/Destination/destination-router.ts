import express from 'express'
import { addDestination } from './destination-handler/add-destination'
import { getDestination } from './destination-handler/get-destinations'



const router = express.Router()

router.post('/add', addDestination)
router.get('/', getDestination)









export default router
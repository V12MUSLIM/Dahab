import express from 'express'
import { addResturant } from './restuarant-controller/add-restuarant'
import {getResturant} from './restuarant-controller/get-restuarant'
const router =express.Router()


router.post('/add', addResturant)
router.get('/', getResturant)











export default router
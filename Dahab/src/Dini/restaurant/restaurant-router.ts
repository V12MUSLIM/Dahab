import express from 'express'
import { getRestaurant } from './resturant-controller/get-restaurant'
import { addRestaurant } from './resturant-controller/add-restaurant'
const router =express.Router()


router.post('/add', addRestaurant)
router.get('/', getRestaurant)











export default router
import express from 'express'
import { getRestaurant } from './resturant-controller/get-restaurant'
import { addRestaurant } from './resturant-controller/add-restaurant'
import { updateRestaurant } from './resturant-controller/update-resturant'
import { deleteRestaurant } from './resturant-controller/delete-restaurant'
const router =express.Router()

router.get('/', getRestaurant)
router.post('/add', addRestaurant)
router.put('/update/:id', updateRestaurant)
router.delete('/delete/:id', deleteRestaurant)











export default router
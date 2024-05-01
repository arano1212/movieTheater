import express from 'express'
import { /* createUSer, */ deleteUserById, getAllUSer, getUSerById, updateUserById } from '../controller/userController.js'

const userRoutes = express.Router()

// userRoutes.post('/', createUSer)
userRoutes.get('/', getAllUSer)
userRoutes.get('/:userId', getUSerById)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUserById)

export default userRoutes

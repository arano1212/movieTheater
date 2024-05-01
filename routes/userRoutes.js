import express from 'express'
import { /* createUSer, */ deleteUserById, getAllUSer, getUSerById, updateUserById } from '../controller/userController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const userRoutes = express.Router()

// userRoutes.post('/', createUSer)
userRoutes.get('/', isAuth, isAdmin, getAllUSer)
userRoutes.get('/:userId', isAuth, isAdmin, getUSerById)
userRoutes.patch('/:userId', isAuth, isAdmin, updateUserById)
userRoutes.delete('/:userId', isAuth, isAdmin, deleteUserById)

export default userRoutes

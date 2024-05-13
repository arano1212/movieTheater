import express from 'express'
import { /* createUSer, */ deleteUserById, getAllUSer, getUSerById, historyTicketByUSer, updateUserById } from '../controller/userController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { getInformation } from '../controller/creator.js'

const userRoutes = express.Router()

// userRoutes.post('/', createUSer)
userRoutes.get('/creator', getInformation)
userRoutes.get('/', isAuth, isAdmin, getAllUSer)
userRoutes.get('/:userId', isAuth, isAdmin, getUSerById)
userRoutes.get('/:userId/ticketsCustomers', isAuth, historyTicketByUSer)
userRoutes.patch('/:userId', isAuth, isAdmin, updateUserById)
userRoutes.delete('/:userId', isAuth, isAdmin, deleteUserById)

export default userRoutes

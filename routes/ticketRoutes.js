import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { DeleteTicketCustomer, createTicketAdminAndEmployee, createTicketCustomer, getAllTickets, getTicketById, getTicketByIdCustomer, updateTicketById } from '../controller/ticketController.js'
import { isCustomer } from '../middlewares/isCustomer.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', isAuth, isAdmin, createTicketAdminAndEmployee)
ticketRoutes.post('/customers', isAuth, isCustomer, createTicketCustomer)
ticketRoutes.get('/', isAuth, isAdmin, getAllTickets)
ticketRoutes.get('/:ticketId', isAuth, isAdmin, getTicketById)
ticketRoutes.get('/customers/:ticketCustomerId', isAuth, isAdmin, isCustomer, getTicketByIdCustomer)
ticketRoutes.patch('/customers/:ticketCustomerId', updateTicketById)
ticketRoutes.delete('/customers/:ticketCustomerId', DeleteTicketCustomer)

export default ticketRoutes

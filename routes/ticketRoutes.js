import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { DeleteTicketCustomer, createTicketAdminAndEmployee, createTicketCustomer, getAllTickets, getTicketById, getTicketByIdCustomer, updateTicketById } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', isAuth, isAdmin, createTicketAdminAndEmployee)
ticketRoutes.post('/customers', createTicketCustomer)
ticketRoutes.get('/', getAllTickets)
ticketRoutes.get('/:ticketId', getTicketById)
ticketRoutes.get('/customers/:ticketCustomerId', getTicketByIdCustomer)
ticketRoutes.patch('/customers/:ticketCustomerId', updateTicketById)
ticketRoutes.delete('/customers/:ticketCustomerId', DeleteTicketCustomer)

export default ticketRoutes

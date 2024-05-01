import express from 'express'
import { createTicketAdminAndEmployee, createTicketCustomer, getAllTickets, getTicketById, getTicketByIdCustomer, updateTicketById } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicketAdminAndEmployee)
ticketRoutes.post('/customers', createTicketCustomer)
ticketRoutes.get('/', getAllTickets)
ticketRoutes.get('/:ticketId', getTicketById)
ticketRoutes.get('/customers/:ticketCustomerId', getTicketByIdCustomer)
ticketRoutes.patch('/customers/:ticketCustomerId', updateTicketById)

export default ticketRoutes

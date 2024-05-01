import express from 'express'
import { createTicketAdminAndEmployee, createTicketCustomer, getAllTickets } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicketAdminAndEmployee)
ticketRoutes.post('/customers', createTicketCustomer)
ticketRoutes.get('/customers', getAllTickets)

export default ticketRoutes

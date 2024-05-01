import express from 'express'
import { createTicketAdmin, createTicketCustomer, getAllTickets } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicketAdmin)
ticketRoutes.post('/customers', createTicketCustomer)
ticketRoutes.get('/customers', getAllTickets)

export default ticketRoutes

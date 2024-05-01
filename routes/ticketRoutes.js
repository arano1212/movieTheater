import express from 'express'
import { createTicketAdmin, createTicketCustomer } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicketAdmin)
ticketRoutes.post('/customers', createTicketCustomer)

export default ticketRoutes

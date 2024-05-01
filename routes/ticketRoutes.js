import express from 'express'
import { createTicketAdmin } from '../controller/ticketController.js'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicketAdmin)

export default ticketRoutes

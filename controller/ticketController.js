import Ticket from '../models/ticket.js'
import User from '../models/user.js'
import Movie from '../models/movie.js'
import TicketCustomer from '../models/ticketCustomer.js'

const createTicketAdminAndEmployee = async (req, res) => {
  try {
    const ticketData = req.body
    if (!ticketData.movie || !ticketData.user) {
      return res.status(400).json({ msg: 'Movie and user data is missing' })
    }

    let userModel = await User.findOne({
      firstName: ticketData.user.firstName,
      lastName: ticketData.user.lastName,
      dni: ticketData.user.dni
    })

    if (!userModel) {
      userModel = await User.create(ticketData.user)
    }

    let movieModel = await Movie.findOne({
      title: ticketData.movie.title,
      releaseDate: ticketData.movie.releaseDate
    })

    if (!movieModel) {
      movieModel = await Movie.create(ticketData.movie)
    }

    ticketData.user = userModel.map(user => user.id)
    ticketData.movie = movieModel.map(movie => movie.id)

    const newTicket = await Ticket.create(ticketData)

    res.status(201).json({ ticket: newTicket })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createTicketCustomer = async (req, res) => {
  try {
    const ticketDataCustomer = req.body
    const newTicketCustomer = await TicketCustomer.create(ticketDataCustomer)
    res.status(201).json(newTicketCustomer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ isActive: true }).populate('user  movie')
    const ticketsCustomers = await TicketCustomer.find({ isActive: true }).populate('user  movie')

    if (!tickets) {
      return res.status(404).json({ msg: 'tickets  no found' })
    }
    if (!ticketsCustomers) {
      return res.status(404).json({ msg: 'tickets  customer no found' })
    }

    const alltickets = { tickets, ticketsCustomers }

    res.status(200).json(alltickets)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getTicketById = async (req, res) => {
  if (!req.params.ticketId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid ticket ID' })
  }
  try {
    const ticket = await Ticket.findById(req.params.ticketId, req.params.seats, { isActive: true }).populate('movie')
    if (!ticket) {
      return res.status(404).json({ msg: 'ticket not found' })
    }
    res.status(200).json(ticket)
  } catch (error) {
    res.status(400).json({ error: 'ticket create Admin not found' })
  }
}

const getTicketByIdCustomer = async (req, res) => {
  if (!req.params.ticketCustomerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid ticket ID' })
  }
  try {
    const ticketCustomer = await TicketCustomer.findById(req.params.ticketCustomerId, req.params.seats, { isActive: true }).populate('movie')
    if (!ticketCustomer) {
      return res.status(404).json({ msg: 'ticket not found' })
    }
    res.status(200).json(ticketCustomer)
  } catch (error) {
    res.status(400).json({ error: 'ticket create customer not found' })
  }
}

const updateTicketById = async (req, res) => {
  if (!req.params.ticketCustomerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid ticket ID' })
  }
  try {
    const ticketCustomer = await TicketCustomer
      .findByIdAndUpdate(req.params.ticketCustomerId, req.body, { new: true }).populate('movie')
    if (!ticketCustomer) {
      return res.status(404).json({ msg: 'ticket no found' })
    }
    res.status(200).json(ticketCustomer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const DeleteTicketCustomer = async (req, res) => {
  if (!req.params.ticketCustomerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid ticket ID' })
  }
  if (req.query.destroy === 'true') {
    try {
      const ticketCustomer = await TicketCustomer
        .findByIdAndDelete(req.params.ticketCustomerId)
      if (!ticketCustomer) {
        return res.status(404).json({ msg: 'ticket customer no found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const ticketCustomer = await TicketCustomer
      .findByIdAndUpdate(req.params.ticketCustomerId, { isACtive: false }, { new: false })

    if (!ticketCustomer) {
      return res.status(404).json({ msg: 'ticket customer not found' })
    }
    res.status(204).json({ msg: ' ticket custoerm not found' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createTicketAdminAndEmployee,
  createTicketCustomer,
  getAllTickets,
  getTicketById,
  getTicketByIdCustomer,
  updateTicketById,
  DeleteTicketCustomer
}

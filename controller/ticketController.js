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

export {
  createTicketAdminAndEmployee,
  createTicketCustomer,
  getAllTickets
}

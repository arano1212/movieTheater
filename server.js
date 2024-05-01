import express from 'express'
import morgan from 'morgan'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connect } from './config/database.js'

const PORT = process.env.PORT || 3000

connect()
const api = express()

api.use(express.json())

api.use(morgan('tiny'))

api.use('/api/v1/movies', movieRoutes)
api.use('/api/v1/users', userRoutes)
api.use('/api/v1/tickets', ticketRoutes)
api.use('/api/v1', authRoutes)

api.listen(PORT, () => {
  console.log(`Server is Running en http://localhost:${PORT} 🚀`)
})

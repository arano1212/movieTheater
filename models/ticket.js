import mongoose from 'mongoose'

const dateEnum = ['2024-05-01T13:00:00', '2024-05-01T15:00:00', '2024-05-01T17:00:00', '2024-05-01T19:00:00', '2024-05-01T21:00:00', '2024-05-01T22:00:00']
const seatsEnum = [
  'A1', 'A2', 'A3', 'A4', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5',
  'D1', 'D2', 'D3', 'D4', 'D5'
]

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  quantity: { type: Number, required: true },
  ticketValue: { type: Number, default: 65 },
  totalValue: {
    type: Number,
    get: function () {
      return this.quantity * this.ticketValue
    }
  },

  showTime: { type: Date, required: true, enum: dateEnum },
  seats: [{ type: String, required: true, enum: seatsEnum }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

ticketSchema.set('toObject', { getters: true })
ticketSchema.set('toJSON', { getters: true })

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket

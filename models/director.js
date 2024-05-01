import mongoose from 'mongoose'

const directorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Director = mongoose.model('Director', directorSchema)

export default Director

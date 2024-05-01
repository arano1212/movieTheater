import mongoose from 'mongoose'

const roleEnum = ['admin', 'employee', 'customer']

const userSchema = new mongoose.Schema({
  dni: {
    type: Number,
    unique: true,
    default: function () {
      return Math.floor(Math.random() * 10000000)
    }
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  role: { type: String, enum: roleEnum, required: true, default: 'customer' },
  phone: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value)
      },
      message: props => '{props.value} no es un numero de telefono valido. debe tener 10 dijitos'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email)
      },
      message: props => `${props.value} no es un correo electronico valido`
    }
  },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User

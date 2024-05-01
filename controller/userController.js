import User from '../models/user.js'

/* const createUSer = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate
    })

    if (existingUser) {
      return res.status(200).json(existingUser)
    }

    const newUser = await User.create(req.body)

    if (!newUser) {
      return res.status(400).json({ msg: 'User data is missing' })
    }

    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
} */

const getAllUSer = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    if (!users) {
      return res.status(400).json({ msg: 'users not found' })
    }
    return res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUSerById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }

  try {
    const user = await User.findById({ _id: req.params.userId, isActive: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status({ error: error.message })
  }
}

const updateUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid movie ID' })
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const user = await User.findByIdAndDelete(req.params.userId)
      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: false })

    if (!user || user.isActive === false) {
      return res.status(404).json({ msg: 'movie not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  // createUSer
  getAllUSer,
  getUSerById,
  updateUserById,
  deleteUserById
}

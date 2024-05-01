const isEmployee = (req, res, next) => {
  if (req.role === 'employee') {
    next()
  } else {
    return res.status(403).json({ message: 'You do not have the necessary permissions' })
  }
}

export { isEmployee }

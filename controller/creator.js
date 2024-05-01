const getInformation = async (req, res) => {
  try {
    res.status(200).json({
      programador: 'angel arano',
      proyecto: 'NoSQL hecho con mongoDB'
    })
  } catch (error) {
    res.status(400).json({ msg: 'error' })
  }
}

export { getInformation }

import Movie from '../models/movie.js'
import Director from '../models/director.js'

const createMovie = async (req, res) => {
  try {
    const movieData = req.body

    if (!movieData.directors) {
      return res.status(400).json({ msg: 'director data is missing' })
    }

    if (!movieData) {
      return res.status(400).json({ msg: 'movie data is missing' })
    }

    if (!Array.isArray(movieData.directors)) {
      return res.satatus(400).json({ msg: 'directors data should be an array' })
    }

    const directorModels = await Promise.all(movieData.directors.map(async director => {
      const existingDirector = await Director.findOne({
        firstName: director.firstName, lastName: director.lastName, birthDate: director.birthDate
      })

      if (existingDirector) {
        return existingDirector
      }

      const newDirector = new Director(director)
      return await Director.create(newDirector)
    }))
    movieData.directors = directorModels.map(director => director.id)
    const newMovie = await Movie.create(movieData)
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true }).populate('directors')
    if (!movies) {
      return res.status(404).json({ msg: 'movies not found' })
    }
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getMovieById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid movie ID' })
  }
  try {
    const movie = await Movie.findById({ _id: req.params.movieId, isActive: true }).populate('directors')
    if (!movie) {
      return res.status(404).json({ msg: 'movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateMovieById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid movie ID' })
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true }).populate('directors')
    if (!movie) {
      return res.status(404).json({ msg: 'movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteMovieById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid movie ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.movieId)
      if (!movie) {
        return res.status(404).json({ msg: 'movie not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, { isActive: false }, { new: false })

    if (!movie || movie.isActive === false) {
      return res.status(404).json({ msg: 'movie not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById

}

import express from 'express'
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovieById } from '../controller/movieController.js'

const movieRoutes = express.Router()

movieRoutes.post('/', createMovie)
movieRoutes.get('/', getAllMovies)
movieRoutes.get('/:movieId', getMovieById)
movieRoutes.patch('/:movieId', updateMovieById)
movieRoutes.delete('/:movieId', deleteMovieById)

export default movieRoutes

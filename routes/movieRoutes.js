import express from 'express'
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovieById } from '../controller/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isEmployee } from '../middlewares/isEmployee.js'
import { isCustomer } from '../middlewares/isCustomer.js'

const movieRoutes = express.Router()

movieRoutes.post('/', isAuth, isAdmin, createMovie)
movieRoutes.get('/', isAuth, isAdmin, isEmployee, isCustomer, getAllMovies)
movieRoutes.get('/:movieId', isAuth, isAdmin, isCustomer, isEmployee, getMovieById)
movieRoutes.patch('/:movieId', isAuth, isAdmin, updateMovieById)
movieRoutes.delete('/:movieId', isAuth, isAdmin, deleteMovieById)

export default movieRoutes

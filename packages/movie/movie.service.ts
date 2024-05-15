import { createMovies, findMovie, findMovies } from './movie.repository'

export const CreateMovies = async (...args: Parameters<typeof createMovies>) =>
	createMovies(...args)

export const FindMovies = async (...args: Parameters<typeof findMovies>) =>
	findMovies(...args)

export const FindMovie = async (...args: Parameters<typeof findMovie>) =>
	findMovie(...args)

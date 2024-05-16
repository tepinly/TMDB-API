import {
	createMovies,
	findMovie,
	findMovies,
	updateMovie,
} from './movie.repository'

export const CreateMovies = async (...args: Parameters<typeof createMovies>) =>
	createMovies(...args)

export const FindMovies = async (...args: Parameters<typeof findMovies>) =>
	findMovies(...args)

export const FindMovie = async (...args: Parameters<typeof findMovie>) =>
	findMovie(...args)

export const UpdateMovie = async (...args: Parameters<typeof updateMovie>) =>
	updateMovie(...args)

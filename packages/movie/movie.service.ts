import { createMovies } from './movie.repository'

export const CreateMovies = (...args: Parameters<typeof createMovies>) =>
	createMovies(...args)

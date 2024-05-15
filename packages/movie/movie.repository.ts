import { Movie } from 'database'

export const createMovie = async (
	data: Parameters<(typeof Movie)['insertOne']>[0],
) => {
	return await Movie.insertOne(data)
}

export const createMovies = async (
	data: Parameters<(typeof Movie)['insertMany']>[0],
) => {
	return await Movie.insertMany(data)
}

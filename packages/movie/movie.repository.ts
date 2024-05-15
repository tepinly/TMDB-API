import { Movie, type TMovie, type papr } from 'database'
import { paginate } from 'shared'

export const createMovies = async (
	data: Parameters<(typeof Movie)['insertMany']>[0],
) => {
	return await Movie.insertMany(data)
}

export const findMovies = async (args: {
	searchTerm?: string
	pageNumber?: string
	pageSize?: string
}) => {
	const { searchTerm, pageNumber, pageSize } = args
	const whereQuery = {
		...(searchTerm && {
			$or: [
				{ title: { $regex: searchTerm, $options: 'i' } },
				{ director: { $regex: searchTerm, $options: 'i' } },
				{ country: { $regex: searchTerm, $options: 'i' } },
				{ genre: { $regex: searchTerm, $options: 'i' } },
				{ colour: { $regex: searchTerm, $options: 'i' } },
			],
		}),
	}

	const [limit, skip] = paginate({ pageNumber, pageSize })
	const [records, recordCount] = await Promise.all([
		Movie.find(whereQuery, { skip, limit }),
		Movie.countDocuments(whereQuery),
	])

	return {
		records,
		pageNumber: skip + 1,
		pageSize: limit,
		recordCount,
	}
}

export const findMovie = async (query: papr.PaprFilter<TMovie>) => {
	return await Movie.findOne(query)
}

import { describe, it, spyOn, expect } from 'bun:test'
import { Movie, ObjectId } from 'database'
import { findMovie } from './movie.repository'

describe('FindMovie', () => {
	const mockMovie = {
		_id: new ObjectId('6644b524dbc94d2e2e34fbdf'),
		position: {
			2022: 1,
			2023: 1,
			2024: 1,
		},
		title: 'Citizen Kane',
		director: 'Welles, Orson',
		year: 1941,
		country: 'USA',
		length: 119,
		genre: 'Drama-Mystery',
		colour: 'BW',
	}
	const findOneSpy = spyOn(Movie, 'findOne')

	it('should return a movie when found', async () => {
		findOneSpy.mockResolvedValueOnce(mockMovie)
		const query = { title: 'Citizen Kane' }
		const result = await findMovie(query)

		expect(Movie.findOne).toHaveBeenCalledWith(query)
		expect(result).toEqual(mockMovie)
	})

	it('should return null when no movie is found', async () => {
		findOneSpy.mockResolvedValueOnce(null)
		const query = { year: 2000 }
		const result = await findMovie(query)

		expect(Movie.findOne).toHaveBeenCalledWith(query)
		expect(result).toEqual(null)
	})
})

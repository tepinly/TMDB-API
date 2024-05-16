import { parseCSV } from 'csv-parser'
import { ObjectId, connect } from 'database'
import { Hono } from 'hono'
import { FindMovie, FindMovies, UpdateMovie } from 'movie'
import { generateToken } from 'shared'
import { CreateUser, FindUser, UpdateUser } from 'user'
import 'dotenv/config'

const app = new Hono()
await connect().then(() => console.log('Connected to MongoDB'))

app.get('/movies', async (c) => {
	const query = c.req.query()
	const result = await FindMovies({
		searchTerm: query.searchTerm,
		pageNumber: query.pageNumber,
		pageSize: query.pageSize,
	})
	return c.json({ result })
})

app.get('/movies/:id', async (c) => {
	const params = c.req.param()
  if (!ObjectId.isValid(params.id)) {
    return c.text('invalid id')
  }
	const _id = new ObjectId(params.id)
	const result = await FindMovie({ _id })
	return c.json({ result })
})

app.post('/generate-token', async (c) => {
	const body = await c.req.json()
	const { username } = body
	if (!username) {
		return c.text('Body missing `username`')
	}
	const user = await FindUser({ username })
	if (user) {
		return c.text('Token already previously generated')
	}

	const token = generateToken()
	await CreateUser({ username, token, favourites: [] })
	return c.json({ token })
})

app.post('/bookmark-movie', async (c) => {
	const body = await c.req.json()
	const { username, token, movieId } = body

	if (!token) {
		return c.text('Body missing `token`')
	}
	if (!username) {
		return c.text('Body missing `username`')
	}
	if (!movieId) {
		return c.text('Body missing `movieId`')
	}

	const user = await FindUser({ username, token })
	if (!user) {
		return c.text('Incorrect username or token')
	}
	const movieObjectId = new ObjectId(`${movieId}`)
	const movie = await FindMovie({ _id: movieObjectId })
	if (!movie) {
		return c.text('incorrect movieId')
	}

	if (user.favourites) {
		for (const movieId of user.favourites) {
			if (movieId.equals(movie._id)) {
				return c.json({ bookmarks: user.favourites })
			}
		}
	}

	await UpdateUser({
		query: { username },
		data: { $push: { favourites: movieObjectId } },
	})

	if (movie.cached) {
		return c.json({ bookmarks: user.favourites })
	}

	const TMDBMovies: any = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${movie.title}&primary_release_year=${movie.year}`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		},
	)
		.then((response) => response.json())
		.then((data) => data)
		.catch((err) => console.error(err))

	const movieDetails = TMDBMovies.results?.[0]
	if (!movieDetails) {
		return c.text("Couldn't fetch additional movie details")
	}

	await UpdateMovie({
		query: { _id: movieObjectId },
		data: {
			cached: true,
			...(movieDetails.adult && { adult: movieDetails.adult }),
			...(movieDetails.tagline && { tagline: movieDetails.tagline }),
			...(movieDetails.overview && { overview: movieDetails.overview }),
			...(movieDetails.spoken_languages && {
				spokenLanguages: movieDetails.spoken_languages,
			}),
			...(movieDetails.poster_path && {
				poster: `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`,
			}),
			...(movieDetails.homepage && { homepage: movieDetails.homepage }),
		},
	})

	return c.json({ bookmarks: user.favourites })
})

app.post('/bookmarks', async (c) => {
	const body = await c.req.json()
	const { username, token } = body

	if (!token) {
		return c.text('Body missing `token`')
	}
	if (!username) {
		return c.text('Body missing `username`')
	}

	const user = await FindUser({ username, token })
	if (!user) {
		return c.text('Incorrect username or token')
	}

	return c.json({ bookmarks: user.favourites })
})

app.post('/upload', async (c) => {
	const body = await c.req.parseBody()
	const file = body['file'] as File
	await parseCSV(file)
	return c.json(200)
})

export default app

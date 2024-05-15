import { parseCSV } from 'csv-parser'
import { ObjectId, connect } from 'database'
import { Hono } from 'hono'
import { FindMovie, FindMovies } from 'movie'

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
	const _id = new ObjectId(params.id)
	const result = await FindMovie({ _id })
	return c.json({ result })
})

app.post('/upload', async (c) => {
	const body = await c.req.parseBody()
	const file = body['file'] as File
	await parseCSV(file)
	return c.json(200)
})

export default app

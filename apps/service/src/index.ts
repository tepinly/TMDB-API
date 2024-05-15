import { parseCSV } from 'csv-parser'
import { connect } from 'database'
import { Hono } from 'hono'

const app = new Hono()
await connect().then(() => console.log('Connected to MongoDB'))

app.get('/', (c) => {
	return c.text('Hono')
})

app.post('/upload', async (c) => {
	const body = await c.req.parseBody()
	const file = body['file'] as File
	await parseCSV(file)
	return c.json(200)
})

export default app

import { connect } from 'database'
import { Hono } from 'hono'

const app = new Hono()
await connect()

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

export default app

import { Hono } from 'hono'
import { connect } from 'database'

const app = new Hono()
await connect()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app

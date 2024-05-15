import { MongoClient } from 'mongodb'
import Papr from 'papr'
import 'dotenv/config'

export const client = new MongoClient(
	process.env.DATABASE_URL ?? 'mongodb://localhost:27019/movieapp',
)

const papr = new Papr()

export async function connect() {
	await client.connect()

	papr.initialize(client.db('movieapp'))
	papr.updateSchemas()

	await papr.updateSchemas()
}

export async function disconnect() {
	await client.close()
}

export default papr

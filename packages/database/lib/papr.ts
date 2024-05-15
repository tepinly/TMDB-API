import { MongoClient } from 'mongodb'
import Papr from 'papr'
import 'dotenv/config'

export const client = new MongoClient(
	process.env.DATABASE_URL ?? 'mongodb://localhost:27019/movieapp',
)

export const paprInstance = new Papr()

export async function connect() {
	await client.connect()

	paprInstance.initialize(client.db('movieapp'))
	paprInstance.updateSchemas()

	await paprInstance.updateSchemas()
}

export async function disconnect() {
	await client.close()
}

export * as papr from 'papr'

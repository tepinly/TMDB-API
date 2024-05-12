import mongoose from 'mongoose'
import 'dotenv/config'

export const connect = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL ?? '')
		console.log('connected to MongoDB')
	} catch (error) {
		console.log(error)
	}
}

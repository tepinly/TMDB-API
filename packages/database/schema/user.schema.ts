import mongoose, { Schema } from 'mongoose'

export const UserSchema = new mongoose.Schema({
	username: String,
	movies: [
		{
			id: { type: Schema.Types.ObjectId, ref: 'movies' },
		},
	],
})

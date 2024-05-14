import mongoose from 'mongoose'

export const MovieSchema = new mongoose.Schema({
	position: {
		2024: Number,
		2023: Number,
		2022: Number,
	},
	title: { type: String, required: true },
	director: { type: String, required: true },
	year: Number,
	country: { type: String, required: true },
	length: Number,
	genre: { type: String, required: true },
	colour: { type: String, required: true },
	tagline: String,
	overview: String,
	spokenLanguages: {
		englishName: String,
		iso_639_1: String,
		name: String,
	},
	poster: String,
	homepage: String,
})

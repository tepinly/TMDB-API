import mongoose from 'mongoose'

export const MovieSchema = new mongoose.Schema({
	position: {
    2024: { type: Number, required: true },
		2023: { type: Number, required: true },
		2022: { type: Number, required: true },
	},
	title: { type: String, required: true },
	director: { type: String, required: true },
	year: { type: Number, required: true },
	country: { type: String, required: true },
	length: { type: Number, required: true },
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

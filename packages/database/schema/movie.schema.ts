import { schema, types } from 'papr'

export const MovieSchema = schema({
	// Original fields
	position: types.object({
		2024: types.number(),
		2023: types.number(),
		2022: types.number(),
	}),
	title: types.string({ required: true }),
	director: types.string({ required: true }),
	year: types.number(),
	country: types.string({ required: true }),
	length: types.number(),
	genre: types.string({ required: true }),
	colour: types.string({ required: true }),
	// TMDB fields
	adult: types.boolean(),
	tagline: types.string(),
	overview: types.string(),
	spokenLanguages: types.object({
		englishName: types.string(),
		iso_639_1: types.string(),
		name: types.string(),
	}),
	poster: types.string(),
	homepage: types.string(),
	cached: types.boolean(),
})

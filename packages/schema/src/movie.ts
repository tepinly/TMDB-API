import { z } from 'zod'

export const movieZodSchema = z.object({
	position: z.object({
		2024: z.number().optional(),
		2023: z.number().optional(),
		2022: z.number().optional(),
	}),
	title: z.string(),
	director: z.string(),
	year: z.number().optional(),
	country: z.string(),
	length: z.number().optional(),
	genre: z.string(),
	colour: z.string(),
})
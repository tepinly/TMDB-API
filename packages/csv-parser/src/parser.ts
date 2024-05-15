import parse from 'csv-simple-parser'
import { isNumeric } from 'shared'
import { z } from 'zod'
import { CreateMovies } from 'movie'
import type { movieZodSchema } from 'schema'

const CsvInitial = z.object({
	Pos: z.string(),
	'2023': z.string(),
	'2022': z.string(),
	Title: z.string(),
	Director: z.string(),
	Year: z.string(),
	Country: z.string(),
	Length: z.string(),
	Genre: z.string(),
	Colour: z.string(),
})

export const parseCSV = async (file: File) => {
	const records: z.infer<typeof movieZodSchema>[] = []
	const csv = parse(await file.text(), { header: true }) as z.infer<
		typeof CsvInitial
	>[]

	for (const record of csv) {
		records.push({
			position: {
				2024: isNumeric(record['Pos']) ? +record['Pos'] : 0,
				2023: isNumeric(record['2023']) ? +record['2023'] : 0,
				2022: isNumeric(record['2022']) ? +record['2022'] : 0,
			},
			title: record['Title'],
			director: record['Director'],
			year: isNumeric(record['Year']) ? +record['Year'] : 0,
			country: record['Country'],
			length: isNumeric(record['Length']) ? +record['Length'] : 0,
			genre: record['Genre'],
			colour: record['Colour'],
		})
	}

	await CreateMovies(records)
}

import parse from 'csv-simple-parser'
import { isNumeric } from 'shared'
import { z } from 'zod'

const MovieRecord = z.object({
	position: z.object({
		2024: z.number().nullable(),
		2023: z.number().nullable(),
		2022: z.number().nullable(),
	}),
	title: z.string(),
	director: z.string(),
	year: z.number().nullable(),
	country: z.string(),
	length: z.number().nullable(),
	genre: z.string(),
	colour: z.string(),
})

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
	const records: z.infer<typeof MovieRecord>[] = []
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
	console.log(records)
}

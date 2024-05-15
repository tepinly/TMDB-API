export const isNumeric = (str: string) => {
	if (typeof str !== 'string') {
		return false
	}
	return !(Number.isNaN(str) || Number.isNaN(Number.parseFloat(str)))
}

export const paginate = (args: { pageNumber?: string; pageSize?: string }) => {
	const limit = args.pageSize ? +args.pageSize : 20
	const skip = ((args.pageNumber ? +args.pageNumber : 1) - 1) * limit
	return [limit, skip]
}

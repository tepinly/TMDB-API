import { type TUser, User, type papr } from 'database'

export const createUser = async (
	data: Parameters<(typeof User)['insertOne']>[0],
) => {
	return await User.insertOne(data)
}

export const findUser = async (query: papr.PaprFilter<TUser>) => {
	return await User.findOne(query)
}

export const updateUser = async (args: {
	query: papr.PaprFilter<TUser>
	data: Partial<(typeof User)['updateOne']>
}) => {
	return await User.updateOne(args.query, args.data)
}

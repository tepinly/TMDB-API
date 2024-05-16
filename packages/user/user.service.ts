import { createUser, findUser, updateUser } from './user.repository'

export const CreateUser = async (...args: Parameters<typeof createUser>) =>
	createUser(...args)

export const FindUser = async (...args: Parameters<typeof findUser>) =>
	findUser(...args)

export const UpdateUser = async (...args: Parameters<typeof updateUser>) =>
	updateUser(...args)

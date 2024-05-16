import { describe, it, spyOn, expect } from 'bun:test'
import { ObjectId, User } from 'database'
import { createUser, findUser } from './user.repository'

describe('CreateUser', () => {
	const createOneSpy = spyOn(User, 'insertOne')

	it('should create user with given data', async () => {
		const data = { username: 'test user' }
		createOneSpy.mockResolvedValueOnce({} as any)
		await createUser(data)
		expect(createOneSpy).toHaveBeenCalledWith(data)
	})
})

describe('FindUser', () => {
	const mockUser = {
		_id: new ObjectId(),
		username: 'test user',
		token: '',
		favourites: [],
	}
	const findOneSpy = spyOn(User, 'findOne')

	it('should return found user', async () => {
		const query = { username: 'test user' }
		findOneSpy.mockResolvedValueOnce(mockUser)
		await findUser(query)
		expect(findOneSpy).toHaveBeenCalledWith(query)
	})
})

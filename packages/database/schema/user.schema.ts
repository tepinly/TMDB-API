import { schema, types } from 'papr'

export const UserSchema = schema({
	username: types.string(),
	favourites: types.objectId(),
})

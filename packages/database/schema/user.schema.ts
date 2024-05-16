import { schema, types } from 'papr'

export const UserSchema = schema({
	username: types.string({ required: true }),
	token: types.string(),
	favourites: types.array(types.objectId()),
})

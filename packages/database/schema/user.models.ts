import { UserSchema } from './user.schema'
import papr from '../lib/papr'

export const User = papr.model('users', UserSchema)

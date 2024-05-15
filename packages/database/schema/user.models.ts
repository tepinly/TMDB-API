import { paprInstance } from '../lib/papr'
import { UserSchema } from './user.schema'

export const User = paprInstance.model('users', UserSchema)

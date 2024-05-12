import mongoose from 'mongoose'
import { UserSchema } from './user.schema'

export const User = mongoose.model('users', UserSchema)

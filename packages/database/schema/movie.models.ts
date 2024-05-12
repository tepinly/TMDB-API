import mongoose from 'mongoose'
import { MovieSchema } from './movie.schema'

export const Movie = mongoose.model('movies', MovieSchema)

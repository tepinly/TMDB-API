import { paprInstance } from '../lib/papr'
import { MovieSchema } from './movie.schema'

export const Movie = paprInstance.model('movies', MovieSchema)

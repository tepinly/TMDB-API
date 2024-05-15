import papr from '../lib/papr'
import { MovieSchema } from './movie.schema'

export const Movie = papr.model('movies', MovieSchema)

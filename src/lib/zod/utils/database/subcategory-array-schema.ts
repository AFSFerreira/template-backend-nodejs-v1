import z from 'zod'
import { subcategorySchema } from './subcategory-schema'

export const subcategoryArraySchema = z.array(subcategorySchema)

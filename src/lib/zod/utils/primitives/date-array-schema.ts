import z from 'zod'
import { dateSchema } from './date-schema'

export const dateArraySchema = z.array(dateSchema)

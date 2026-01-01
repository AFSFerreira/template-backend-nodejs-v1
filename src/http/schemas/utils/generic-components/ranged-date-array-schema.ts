import z from 'zod'
import { rangedDateSchema } from '../primitives/ranged-date-schema'

export const rangedDateArraySchema = z.array(rangedDateSchema)

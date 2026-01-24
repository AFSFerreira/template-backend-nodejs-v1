import { validate as validatePix } from 'pixkey'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const pixSchema = limitedNonemptyTextSchema.refine((data) => validatePix(data).length > 0)

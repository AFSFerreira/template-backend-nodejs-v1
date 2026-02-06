import type { PixError } from 'pix-utils'
import { parsePix } from 'pix-utils'
import { validate as validatePix } from 'pixkey'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const pixSchema = limitedNonemptyTextSchema.refine(
  (data) => (parsePix(data) as PixError).error === undefined || validatePix(data).length > 0,
)

import { z } from 'zod'
import { nonemptyTextSchema } from './nonempty-text'

export const keywordSchema = z.preprocess(
  (keyword) => (typeof keyword === 'string' ? [keyword] : keyword),
  z
    .array(nonemptyTextSchema)
    .max(4)
    .transform((arr) => arr.map((keyword) => keyword.toUpperCase())),
)

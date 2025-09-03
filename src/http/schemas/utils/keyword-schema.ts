import { z } from 'zod'
import { upperCaseTextSchema } from './uppercase-text-schema'

export const keywordSchema = z.preprocess(
  (keyword) => (typeof keyword === 'string' ? [keyword] : keyword),
  z.array(upperCaseTextSchema).min(1).max(4),
)

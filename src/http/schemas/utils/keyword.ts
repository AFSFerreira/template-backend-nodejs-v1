import { z } from 'zod'
import { upperCaseTextSchema } from './uppercase-text-schema'

export const keywordSchema = z.preprocess(
  (keyword) => (typeof keyword === 'string' ? [keyword] : keyword),
  z.array(upperCaseTextSchema).max(4).default([]),
)

import { KEYWORD_MAX_LENGTH } from '@constants/validation-constants'
import { z } from 'zod'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'

const singleKeywordSchema = upperCaseTextSchema.max(KEYWORD_MAX_LENGTH)

export const keywordSchema = z.union([
  z.array(singleKeywordSchema).min(1).max(4),
  singleKeywordSchema.transform((data) => [data]),
])

import { KEYWORD_MAX_LENGTH } from '@constants/validation-constants'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import { z } from 'zod'

const singleKeywordSchema = upperCaseTextSchema.max(KEYWORD_MAX_LENGTH)

export const keywordSchema = z.union([
  z.array(singleKeywordSchema).min(1).max(4),
  singleKeywordSchema.transform((data) => [data]),
])

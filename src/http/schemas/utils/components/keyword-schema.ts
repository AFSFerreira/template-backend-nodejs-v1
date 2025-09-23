import { z } from 'zod'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'

export const keywordSchema = z.union([z.array(upperCaseTextSchema).min(1).max(4), upperCaseTextSchema.transform((data) => ([data]))])

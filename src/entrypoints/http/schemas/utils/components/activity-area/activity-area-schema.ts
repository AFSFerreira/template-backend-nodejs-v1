import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const activityAreaSchema = z.object({
  mainActivityArea: upperCaseTextSchema,
  subActivityArea: upperCaseTextSchema,
})

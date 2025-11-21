import z from 'zod'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'

export const activityAreaSchema = z.object({
  mainActivityArea: upperCaseTextSchema,
  subActivityArea: upperCaseTextSchema,
})

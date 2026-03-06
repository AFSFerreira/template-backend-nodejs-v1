import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const addressSchema = z.object({
  zip: upperCaseTextSchema,
  number: upperCaseTextSchema,
  district: upperCaseTextSchema,
  street: upperCaseTextSchema,
  city: upperCaseTextSchema,
  country: upperCaseTextSchema,
  state: upperCaseTextSchema,
  complement: upperCaseTextSchema.optional(),
})

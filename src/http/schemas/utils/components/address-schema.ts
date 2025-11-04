import z from "zod"
import { upperCaseTextSchema } from "../primitives/uppercase-text-schema"

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

import z from 'zod'
import { nonemptyNullableTextSchema } from '../primitives/nonempty-nullable-text-schema'
import { nonemptyTextArraySchema } from '../primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '../primitives/nonempty-text-schema'

export const universityApiResponseSchema = z.object({
  web_pages: nonemptyTextArraySchema.default([]),
  name: nonemptyTextSchema,
  alpha_two_code: nonemptyNullableTextSchema,
  'state-province': nonemptyNullableTextSchema,
  domains: nonemptyTextArraySchema.default([]),
  country: nonemptyNullableTextSchema,
})

export const universitiesApiResponseSchema = z.array(universityApiResponseSchema)

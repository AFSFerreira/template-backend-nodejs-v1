import { LANGUAGE_OPTIONS } from '@custom-types/translation-language-type'
import z from 'zod'

export const getOccupationQuerySchema = z.object({
  lang: z.enum(LANGUAGE_OPTIONS).default('pt'),
})

export type GetOccupationQuerySchemaType = z.infer<
  typeof getOccupationQuerySchema
>

import { LANGUAGE_OPTIONS } from '@custom-types/translation-language-type'
import z from 'zod'

export const getEducationLevelsQuerySchema = z.object({
  lang: z.enum(LANGUAGE_OPTIONS).default('pt'),
})

export type GetEducationLevelsQuerySchemaType = z.infer<
  typeof getEducationLevelsQuerySchema
>

import { LANGUAGE_OPTIONS } from '@custom-types/translation-language-type'
import z from 'zod'

export const getEducationLevelsParamsSchema = z.object({
  lang: z.enum(LANGUAGE_OPTIONS),
})

export type GetEducationLevelsParamsSchemaType = z.infer<
  typeof getEducationLevelsParamsSchema
>

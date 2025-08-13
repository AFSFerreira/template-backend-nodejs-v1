import { textWithoutInnerSpacesSchema } from './text-without-inner-spaces-schema'
import { LIMITED_CHARACTERS_SIZE } from '@/constants/zod-constants'

export const passwordSchema = textWithoutInnerSpacesSchema
  .min(8)
  .max(LIMITED_CHARACTERS_SIZE)

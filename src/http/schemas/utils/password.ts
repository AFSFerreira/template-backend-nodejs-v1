import { textWithoutInnerSpacesSchema } from './text-without-inner-spaces-schema'
import { limitedCharactersSize } from '@/constants/zod-constants'

export const passwordSchema = textWithoutInnerSpacesSchema
  .min(8)
  .max(limitedCharactersSize)

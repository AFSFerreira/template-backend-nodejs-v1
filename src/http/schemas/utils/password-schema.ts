import { LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { limitedNonemptyTextSchema } from './limited-nonempty-text-schema'

export const passwordSchema = limitedNonemptyTextSchema
  .min(8)
  .max(LIMITED_CHARACTERS_SIZE)

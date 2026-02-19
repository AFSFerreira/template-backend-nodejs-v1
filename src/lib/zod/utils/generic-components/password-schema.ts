import {
  PASSWORD_DIGIT_REGEX,
  PASSWORD_SPECIAL_CHARACTER_REGEX,
  UPPERCASE_PASSWORD_CHARACTERS_REGEX,
} from '@constants/regex-constants'
import { MAX_PASSWORD_SIZE, MIN_PASSWORD_SIZE } from '@constants/validation-constants'
import {
  PASSWORD_DIGIT,
  PASSWORD_SPECIAL_CHARACTER,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  PASSWORD_UPPERCASE,
} from '@messages/validations/user-validations'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const passwordSchema = limitedNonemptyTextSchema
  .min(MIN_PASSWORD_SIZE, PASSWORD_TOO_SHORT)
  .max(MAX_PASSWORD_SIZE, PASSWORD_TOO_LONG)
  .regex(UPPERCASE_PASSWORD_CHARACTERS_REGEX, PASSWORD_UPPERCASE)
  .regex(PASSWORD_DIGIT_REGEX, PASSWORD_DIGIT)
  .regex(PASSWORD_SPECIAL_CHARACTER_REGEX, PASSWORD_SPECIAL_CHARACTER)

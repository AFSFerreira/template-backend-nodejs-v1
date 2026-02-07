import { DIGITS_ONLY_REGEX } from '@constants/regex-constants'
import { NUMERIC_INTEGER_STRING_INVALID } from '@messages/validations/common-validations'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const numericIntegerStringSchema = limitedNonemptyTextSchema.regex(
  DIGITS_ONLY_REGEX,
  NUMERIC_INTEGER_STRING_INVALID,
)

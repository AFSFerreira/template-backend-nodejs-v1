import { DIGITS_ONLY_REGEX } from '@constants/regex-constants'
import { NUMERIC_INTEGER_STRING_INVALID } from '@messages/validations/common-validations'
import { nonemptyTextSchema } from '../primitives/nonempty-text-schema'

export const numericIntegerStringSchema = nonemptyTextSchema.regex(DIGITS_ONLY_REGEX, NUMERIC_INTEGER_STRING_INVALID)

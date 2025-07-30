import { nonemptyTextSchema } from './nonempty-text'
import { PASSWORD_REGEX } from '@/constants/regex'

export const passwordSchema = nonemptyTextSchema
  .min(8)
  .regex(
    PASSWORD_REGEX,
    'The password must contain at least 8 characters, one uppercase letter, one numeric digit and one special character.',
  )

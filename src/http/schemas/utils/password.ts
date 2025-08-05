import { nonemptyTextSchema } from './nonempty-text'
import { messages } from '@/constants/messages'
import { PASSWORD_REGEX } from '@/constants/regex'

export const passwordSchema = nonemptyTextSchema
  .min(8)
  .regex(PASSWORD_REGEX, messages.validation.invalidPasswordFormat)

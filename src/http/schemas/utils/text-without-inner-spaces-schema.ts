import { nonemptyTextSchema } from './nonempty-text'
import { messages } from '@/constants/messages'
import { INNER_SPACES_REGEX } from '@/constants/regex'

export const textWithoutInnerSpacesSchema = nonemptyTextSchema.regex(
  INNER_SPACES_REGEX,
  messages.validation.invalidInnerSpaces,
)

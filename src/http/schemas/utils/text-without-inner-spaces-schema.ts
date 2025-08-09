import { limitedNonemptyTextSchema } from './limited-nonempty-text'
import { messages } from '@/constants/messages'
import { INNER_SPACES_REGEX } from '@/constants/regex'

export const textWithoutInnerSpacesSchema = limitedNonemptyTextSchema.regex(
  INNER_SPACES_REGEX,
  messages.validation.invalidInnerSpaces,
)

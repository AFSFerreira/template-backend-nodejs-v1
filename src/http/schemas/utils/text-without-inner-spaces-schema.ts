import { messages } from '@constants/messages'
import { INNER_SPACES_REGEX } from '@constants/regex'
import { limitedNonemptyTextSchema } from './limited-nonempty-text'

export const textWithoutInnerSpacesSchema = limitedNonemptyTextSchema.regex(
  INNER_SPACES_REGEX,
  messages.validation.invalidInnerSpaces,
)

import { messages } from '@constants/messages'
import { INNER_SPACES_REGEX } from '@constants/regex'
import { upperCaseTextSchema } from './uppercase-text-schema'

export const uppercaseTextWithoutInnerSpacesSchema = upperCaseTextSchema.regex(
  INNER_SPACES_REGEX,
  messages.validation.invalidInnerSpaces,
)

import { messages } from '@constants/messages'
import { ORCID_NUMBER_VALIDATION_REGEX } from '@constants/regex'
import { uppercaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces-schema'

export const orcidNumberSchema = uppercaseTextWithoutInnerSpacesSchema.regex(
  ORCID_NUMBER_VALIDATION_REGEX,
  messages.validation.invalidOrcidFormat,
)

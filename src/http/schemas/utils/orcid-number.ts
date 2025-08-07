import { uppercaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces-schema'
import { messages } from '@/constants/messages'
import { ORCID_NUMBER_VALIDATION_REGEX } from '@/constants/regex'

export const orcidNumberSchema = uppercaseTextWithoutInnerSpacesSchema.regex(
  ORCID_NUMBER_VALIDATION_REGEX,
  messages.validation.invalidOrcidFormat,
)

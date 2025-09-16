import { ORCID_NUMBER_VALIDATION_REGEX } from '@constants/regex-constants'
import { INVALID_ORCID_FORMAT } from 'src/messages/validation'
import { uppercaseTextWithoutInnerSpacesSchema } from '../primitives/uppercase-text-without-inner-spaces-schema'

export const orcidNumberSchema = uppercaseTextWithoutInnerSpacesSchema.regex(
  ORCID_NUMBER_VALIDATION_REGEX,
  INVALID_ORCID_FORMAT,
)

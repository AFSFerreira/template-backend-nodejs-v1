import { z } from 'zod'
import { upperCaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces'
import { messages } from '@/constants/messages'
import { ORCID_NUMBER_VALIDATION_REGEX } from '@/constants/regex'

export const orcidNumberSchema = upperCaseTextWithoutInnerSpacesSchema.refine(
  (data) => {
    const validOrcidNumberSchema = z
      .string()
      .regex(ORCID_NUMBER_VALIDATION_REGEX)
    return validOrcidNumberSchema.safeParse(data).success
  },
  {
    message: messages.validation.invalidOrcidFormat,
  },
)

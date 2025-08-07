import { z } from 'zod'
import { upperCaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces'
import { ORCID_NUMBER_VALIDATION_REGEX } from '@/constants/regex'

export const orcidNumberSchema = upperCaseTextWithoutInnerSpacesSchema.refine(
  (data) => {
    const validOrcidNumberSchema = z
      .string()
      .regex(ORCID_NUMBER_VALIDATION_REGEX)
    return validOrcidNumberSchema.safeParse(data).success
  },
  {
    message:
      'Invalid orcid number format. It must be provided in the format: 0000-0000-0000-0000',
    path: ['user', 'orcidNumber'],
  },
)

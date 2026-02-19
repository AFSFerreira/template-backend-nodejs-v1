import { INVALID_ORCID_FORMAT } from '@messages/validations/user-validations'
import orcid from 'orcid-utils'
import z from 'zod'
import { uppercaseTextWithoutInnerSpacesSchema } from '../primitives/uppercase-text-without-inner-spaces-schema'

export const orcidNumberSchema = z.preprocess(
  (data) => (typeof data === 'string' ? orcid.toDashFormat(data) : data),
  uppercaseTextWithoutInnerSpacesSchema.refine(orcid.isValid, INVALID_ORCID_FORMAT),
)

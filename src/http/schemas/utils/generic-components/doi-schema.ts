import { INVALID_DOI_FORMAT } from '@messages/validations/academic-publication-validations'
import { doi } from 'doi-utils'
import { urlSchema } from '../primitives/url-schema'

export const doiSchema = urlSchema.refine((linkDoi) => doi.validate(linkDoi), INVALID_DOI_FORMAT)

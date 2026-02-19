import { allowedDocumentMimeTypes } from '@constants/static-file-constants'
import { ALLOWED_DOCUMENT_EXTENSIONS } from '@messages/validations/academic-publication-validations'
import z from 'zod'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const documentSchema = z.object({
  mimetype: z.enum(allowedDocumentMimeTypes, ALLOWED_DOCUMENT_EXTENSIONS),
  filename: limitedNonemptyTextSchema,
})

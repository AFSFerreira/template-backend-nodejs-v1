import { allowedImageMimeTypes } from '@constants/file-constants'
import { ALLOWED_IMAGE_EXTENSIONS } from '@messages/validations'
import z from 'zod'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const imageSchema = z.object({
  mimetype: z.enum(allowedImageMimeTypes, ALLOWED_IMAGE_EXTENSIONS),
  filename: limitedNonemptyTextSchema,
})

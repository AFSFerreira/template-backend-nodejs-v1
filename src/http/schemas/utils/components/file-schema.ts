import { MAX_IMAGE_FILE_SIZE_BYTES } from '@constants/file-constants'
import { allowedImageMimeTypes } from '@constants/profile-image-constants'
import z from 'zod'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const fileSchema = z.object({
  buffer: z.instanceof(Buffer),
  mimetype: z.enum(allowedImageMimeTypes),
  originalname: limitedNonemptyTextSchema,
  size: z.coerce.number().int().positive().max(MAX_IMAGE_FILE_SIZE_BYTES),
})

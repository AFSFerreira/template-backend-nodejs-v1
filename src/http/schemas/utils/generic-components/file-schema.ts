import { MAX_IMAGE_FILE_SIZE_BYTES } from '@constants/file-constants'
import { allowedImageMimeTypes } from '@constants/profile-image-constants'
import z from 'zod'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'
import { positiveIntegerSchema } from '../primitives/positive-integer-schema'

export const fileSchema = z.object({
  buffer: z.instanceof(Buffer),
  mimetype: z.enum(allowedImageMimeTypes),
  originalname: limitedNonemptyTextSchema,
  size: positiveIntegerSchema.max(MAX_IMAGE_FILE_SIZE_BYTES),
})

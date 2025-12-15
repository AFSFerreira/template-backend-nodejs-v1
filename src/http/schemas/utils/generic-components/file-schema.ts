import { allowedHTMLMimeTypes } from '@constants/static-file-constants'
import z from 'zod'
import { nonemptyTextSchema } from '../primitives/nonempty-text-schema'

export const fileSchema = z.object({
  filename: nonemptyTextSchema,
  mimetype: z.enum(allowedHTMLMimeTypes),
})

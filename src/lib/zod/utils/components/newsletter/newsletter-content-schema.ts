import { NewsletterFormatType } from '@prisma/generated/enums'
import z from 'zod'
import { limitedNonemptyTextSchema } from '../../primitives/limited-nonempty-text-schema'
import { proseMirrorSchema } from '../blog/prose-mirror-schema'

const htmlFileContentSchema = z.object({
  format: z.literal(NewsletterFormatType.HTML_FILE),
  contentFilename: limitedNonemptyTextSchema,
})

const proseMirrorContentSchema = z.object({
  format: z.literal(NewsletterFormatType.PROSEMIRROR),
  proseContent: proseMirrorSchema,
})

export const newsletterContentSchema = z.discriminatedUnion('format', [htmlFileContentSchema, proseMirrorContentSchema])

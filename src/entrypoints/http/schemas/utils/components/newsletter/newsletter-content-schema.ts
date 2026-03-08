import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { NewsletterFormatType } from '@prisma/generated/enums'
import z from 'zod'
import { proseMirrorSchema } from '../blog/prose-mirror-schema'

const htmlFileContentSchema = z.object({
  format: z.literal(NewsletterFormatType.HTML_FILE),
  contentFilename: limitedNonemptyTextSchema,
})

const proseMirrorContentSchema = z.object({
  format: z.literal(NewsletterFormatType.PROSEMIRROR),
  proseContent: proseMirrorSchema,
  templateId: modelPublicIdSchema,
})

export const newsletterContentSchema = z.discriminatedUnion('format', [htmlFileContentSchema, proseMirrorContentSchema])

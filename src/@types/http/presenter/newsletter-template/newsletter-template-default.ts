import type { NewsletterTemplate } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface NewsletterTemplateDefaultPresenterInput extends NewsletterTemplate {}

export const httpNewsletterTemplateSchema = z.object({
  id: modelPublicIdSchema,
  templateName: nonemptyTextSchema,
})

export type HTTPNewsletterTemplate = z.infer<typeof httpNewsletterTemplateSchema>

import type { findNewsletterTemplateByPublicIdParamsSchema } from '@http/schemas/newsletter-template/find-newsletter-template-by-public-id-params-schema'
import type z from 'zod'

export type FindNewsletterTemplateByPublicIdParamsType = typeof findNewsletterTemplateByPublicIdParamsSchema

export type FindNewsletterTemplateByPublicIdParamsSchemaType = z.infer<FindNewsletterTemplateByPublicIdParamsType>

import type { previewNewsletterContentBodySchema } from '@http/schemas/newsletter/preview-newsletter-content-body-schema'
import type z from 'zod'

export type PreviewNewsletterContentBodyType = typeof previewNewsletterContentBodySchema

export type PreviewNewsletterContentBodySchemaType = z.infer<PreviewNewsletterContentBodyType>

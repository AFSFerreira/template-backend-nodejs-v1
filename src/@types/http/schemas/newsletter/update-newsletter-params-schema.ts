import type { updateNewsletterParamsSchema } from '@http/schemas/newsletter/update-newsletter-params-schema'
import type z from 'zod'

export type UpdateNewsletterParamsType = typeof updateNewsletterParamsSchema

export type UpdateNewsletterParamsSchemaType = z.infer<UpdateNewsletterParamsType>

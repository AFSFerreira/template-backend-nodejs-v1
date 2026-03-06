import type { deleteNewsletterParamsSchema } from '@http/schemas/newsletter/delete-newsletter-params-schema'
import type z from 'zod'

export type DeleteNewsletterParamsType = typeof deleteNewsletterParamsSchema

export type DeleteNewsletterParamsSchemaType = z.infer<DeleteNewsletterParamsType>

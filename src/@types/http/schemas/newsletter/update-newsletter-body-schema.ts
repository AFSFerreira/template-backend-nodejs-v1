import type { updateNewsletterBodySchema } from '@http/schemas/newsletter/update-newsletter-body-schema'
import type z from 'zod'

export type UpdateNewsletterBodyType = typeof updateNewsletterBodySchema

export type UpdateNewsletterBodySchemaType = z.infer<UpdateNewsletterBodyType>

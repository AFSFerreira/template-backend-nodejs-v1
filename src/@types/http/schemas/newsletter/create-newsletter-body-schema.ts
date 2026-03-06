import type { createNewsletterBodySchema } from '@http/schemas/newsletter/create-newsletter-body-schema'
import type z from 'zod'

export type CreateNewsletterBodyType = typeof createNewsletterBodySchema

export type CreateNewsletterBodySchemaType = z.infer<CreateNewsletterBodyType>

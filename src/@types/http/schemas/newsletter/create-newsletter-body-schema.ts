import type { createNewsletterBodySchema } from '@schemas/newsletter/create-newsletter-body-schema'
import type z from 'zod'

export type CreateNewsletterBodySchemaType = z.infer<typeof createNewsletterBodySchema>

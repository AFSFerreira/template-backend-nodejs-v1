import type { updateNewsletterBodySchema } from '@schemas/newsletter/update-newsletter-body-schema'
import type z from 'zod'

export type UpdateNewsletterBodySchemaType = z.infer<typeof updateNewsletterBodySchema>

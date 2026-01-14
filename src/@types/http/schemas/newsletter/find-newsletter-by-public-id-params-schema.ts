import type { findNewsletterByPublicIdParamsSchema } from '@schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type z from 'zod'

export type FindNewsletterByPublicIdParamsSchemaType = z.infer<typeof findNewsletterByPublicIdParamsSchema>

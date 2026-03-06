import type { findNewsletterByPublicIdParamsSchema } from '@http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type z from 'zod'

export type FindNewsletterByPublicIdParamsType = typeof findNewsletterByPublicIdParamsSchema

export type FindNewsletterByPublicIdParamsSchemaType = z.infer<FindNewsletterByPublicIdParamsType>

import type { getAllNewsletterTemplatesQuerySchema } from '@http/schemas/newsletter-template/get-all-newsletter-templates-query-schema'
import type z from 'zod'

export type GetAllNewsletterTemplatesQueryType = typeof getAllNewsletterTemplatesQuerySchema

export type GetAllNewsletterTemplatesQuerySchemaType = z.infer<GetAllNewsletterTemplatesQueryType>

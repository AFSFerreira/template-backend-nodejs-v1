import type { getAllNewslettersQuerySchema } from '@http/schemas/newsletter/get-all-newsletters-query-schema'
import type z from 'zod'

export type GetAllNewslettersQueryType = typeof getAllNewslettersQuerySchema

export type GetAllNewslettersQuerySchemaType = z.infer<GetAllNewslettersQueryType>

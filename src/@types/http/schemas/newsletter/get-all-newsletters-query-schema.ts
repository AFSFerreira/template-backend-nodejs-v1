import type { getAllNewslettersQuerySchema } from '@http/schemas/newsletter/get-all-newsletters-query-schema'
import type z from 'zod'

export type GetAllNewslettersQuerySchemaType = z.infer<typeof getAllNewslettersQuerySchema>

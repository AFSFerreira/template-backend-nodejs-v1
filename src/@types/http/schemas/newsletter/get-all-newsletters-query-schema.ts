import type { getAllNewslettersQuerySchema } from '@schemas/newsletter/get-all-newsletters-query-schema'
import type z from 'zod'

export type GetAllNewslettersQuerySchemaType = z.infer<typeof getAllNewslettersQuerySchema>

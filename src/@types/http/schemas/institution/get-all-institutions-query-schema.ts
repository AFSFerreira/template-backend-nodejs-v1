import type { getAllInstitutionsQuerySchema } from '@http/schemas/institution/get-all-institutions-query-schema'
import type z from 'zod'

export type GetAllInstitutionsQuerySchemaType = z.infer<typeof getAllInstitutionsQuerySchema>

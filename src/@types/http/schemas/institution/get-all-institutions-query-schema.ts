import type { getAllInstitutionsQuerySchema } from '@schemas/institution/get-all-institutions-query-schema'
import type z from 'zod'

export type GetAllInstitutionsQuerySchemaType = z.infer<typeof getAllInstitutionsQuerySchema>

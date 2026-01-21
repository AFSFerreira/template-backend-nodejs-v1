import type { getAllInternalInstitutionsNamesQuerySchema } from '@schemas/institution/get-all-internal-institutions-names-query-schema'
import type z from 'zod'

export type GetAllInternalInstitutionsNamesQuerySchemaType = z.infer<typeof getAllInternalInstitutionsNamesQuerySchema>

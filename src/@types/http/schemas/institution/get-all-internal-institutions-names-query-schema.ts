import type { getAllInternalInstitutionsNamesQuerySchema } from '@http/schemas/institution/get-all-internal-institutions-names-query-schema'
import type z from 'zod'

export type GetAllInternalInstitutionsNamesQueryType = typeof getAllInternalInstitutionsNamesQuerySchema

export type GetAllInternalInstitutionsNamesQuerySchemaType = z.infer<GetAllInternalInstitutionsNamesQueryType>

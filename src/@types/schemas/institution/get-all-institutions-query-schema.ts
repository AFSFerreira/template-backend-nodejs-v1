import type { getAllInstitutionsSchema } from '@schemas/institution/get-all-institutions-query-schema'
import type z from 'zod'

export type GetAllInstitutionsSchemaType = z.infer<typeof getAllInstitutionsSchema>

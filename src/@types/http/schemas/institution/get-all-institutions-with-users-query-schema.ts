import type { getAllInstitutionsWithUsersQuerySchema } from '@http/schemas/institution/get-all-institutions-with-users-query-schema'
import type z from 'zod'

export type GetAllInstitutionsWithUsersQuerySchemaType = z.infer<typeof getAllInstitutionsWithUsersQuerySchema>

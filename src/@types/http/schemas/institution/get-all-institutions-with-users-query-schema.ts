import type { getAllInstitutionsWithUsersQuerySchema } from '@http/schemas/institution/get-all-institutions-with-users-query-schema'
import type z from 'zod'

export type GetAllInstitutionsWithUsersQueryType = typeof getAllInstitutionsWithUsersQuerySchema

export type GetAllInstitutionsWithUsersQuerySchemaType = z.infer<GetAllInstitutionsWithUsersQueryType>

import type { getAllUsersDetailedQuerySchema } from '@http/schemas/user/get-all-users-detailed-query-schema'
import type z from 'zod'

export type GetAllUsersDetailedQueryType = typeof getAllUsersDetailedQuerySchema

export type GetAllUsersDetailedQuerySchemaType = z.infer<GetAllUsersDetailedQueryType>

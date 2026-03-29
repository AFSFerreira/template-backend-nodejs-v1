import type { getAllUsersQuerySchema } from '@http/schemas/user/get-all-users-query-schema'
import type z from 'zod'

export type GetAllUsersQueryType = typeof getAllUsersQuerySchema

export type GetAllUsersQuerySchemaType = z.infer<GetAllUsersQueryType>

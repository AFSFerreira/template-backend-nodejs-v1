import type { getAllUsersSimplifiedQuerySchema } from '@http/schemas/user/get-all-users-simplified-query-schema'
import type z from 'zod'

export type GetAllUsersSimplifiedQueryType = typeof getAllUsersSimplifiedQuerySchema

export type GetAllUsersSimplifiedQuerySchemaType = z.infer<GetAllUsersSimplifiedQueryType>

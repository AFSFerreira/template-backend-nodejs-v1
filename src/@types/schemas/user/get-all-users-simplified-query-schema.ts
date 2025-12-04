import type { getAllUsersSimplifiedQuerySchema } from '@schemas/user/get-all-users-simplified-query-schema'
import type z from 'zod'

export type GetAllUsersSimplifiedQuerySchemaType = z.infer<typeof getAllUsersSimplifiedQuerySchema>

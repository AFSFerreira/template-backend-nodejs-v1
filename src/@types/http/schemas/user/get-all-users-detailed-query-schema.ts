import type { getAllUsersDetailedQuerySchema } from '@schemas/user/get-all-users-detailed-query-schema'
import type z from 'zod'

export type GetAllUsersDetailedQuerySchemaType = z.infer<typeof getAllUsersDetailedQuerySchema>

import type { exportUsersDataQuerySchema } from '@http/schemas/user/export-users-data-query-schema'
import type { z } from 'zod'

export type ExportUsersDataQueryType = typeof exportUsersDataQuerySchema

export type ExportUsersDataQuerySchemaType = z.infer<ExportUsersDataQueryType>

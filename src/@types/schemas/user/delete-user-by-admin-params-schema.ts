import type { deleteUserByAdminParamsSchema } from '@schemas/user/delete-user-by-admin-params-schema'
import type z from 'zod'

export type DeleteUserByAdminParamsSchemaType = z.infer<typeof deleteUserByAdminParamsSchema>

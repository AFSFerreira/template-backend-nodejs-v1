import type { updateUserPermissionsParamsSchema } from '@schemas/user/update-user-permissions-params-schema'
import type z from 'zod'

export type UpdateUserPermissionsParamsSchemaType = z.infer<typeof updateUserPermissionsParamsSchema>

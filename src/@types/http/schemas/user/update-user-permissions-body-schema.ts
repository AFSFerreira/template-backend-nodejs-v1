import type { updateUserPermissionsBodySchema } from '@http/schemas/user/update-user-permissions-body-schema'
import type z from 'zod'

export type UpdateUserPermissionsBodySchemaType = z.infer<typeof updateUserPermissionsBodySchema>

import type { updateUserPermissionsBodySchema } from '@http/schemas/user/update-user-permissions-body-schema'
import type z from 'zod'

export type UpdateUserPermissionsBodyType = typeof updateUserPermissionsBodySchema

export type UpdateUserPermissionsBodySchemaType = z.infer<UpdateUserPermissionsBodyType>

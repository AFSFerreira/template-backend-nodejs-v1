import type { updateUserPermissionsParamsSchema } from '@http/schemas/user/update-user-permissions-params-schema'
import type z from 'zod'

export type UpdateUserPermissionsParamsType = typeof updateUserPermissionsParamsSchema

export type UpdateUserPermissionsParamsSchemaType = z.infer<UpdateUserPermissionsParamsType>

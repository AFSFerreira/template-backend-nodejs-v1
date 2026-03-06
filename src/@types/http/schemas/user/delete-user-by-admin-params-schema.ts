import type { deleteUserByAdminParamsSchema } from '@http/schemas/user/delete-user-by-admin-params-schema'
import type z from 'zod'

export type DeleteUserByAdminParamsType = typeof deleteUserByAdminParamsSchema

export type DeleteUserByAdminParamsSchemaType = z.infer<DeleteUserByAdminParamsType>

import type { transferAdminRoleBodySchema } from '@http/schemas/user/transfer-admin-role-body-schema'
import type z from 'zod'

export type TransferAdminRoleBodySchemaType = z.infer<typeof transferAdminRoleBodySchema>

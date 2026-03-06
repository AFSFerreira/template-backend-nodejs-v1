import type { authenticateConnectionInfoSchema } from '@http/schemas/user/authenticate-connection-info-schema'
import type z from 'zod'

export type AuthenticateConnectionInfoType = typeof authenticateConnectionInfoSchema

export type AuthenticateConnectionInfoSchemaType = z.infer<AuthenticateConnectionInfoType>

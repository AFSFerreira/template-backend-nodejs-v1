import type { authenticateBodySchema } from '@http/schemas/user/authenticate-body-schema'
import type z from 'zod'

export type AuthenticateType = typeof authenticateBodySchema

export type AuthenticateSchemaType = z.infer<AuthenticateType>

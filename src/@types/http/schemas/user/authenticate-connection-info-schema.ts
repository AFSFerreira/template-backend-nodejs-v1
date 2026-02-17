import type { authenticateConnectionInfoSchema } from '@schemas/user/authenticate-connection-info-schema'
import type z from 'zod'

export type AuthenticateConnectionInfoSchemaType = z.infer<typeof authenticateConnectionInfoSchema>

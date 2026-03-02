import type { authenticateBodySchema } from '@http/schemas/user/authenticate-body-schema'
import type z from 'zod'

export type AuthenticateSchemaType = z.infer<typeof authenticateBodySchema>

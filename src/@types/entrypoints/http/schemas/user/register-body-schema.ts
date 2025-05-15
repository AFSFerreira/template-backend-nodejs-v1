import type { registerBodySchema } from '@http/schemas/user/register-body-schema'
import type z from 'zod'

export type RegisterBodyType = typeof registerBodySchema

export type RegisterUserBodySchemaType = z.infer<RegisterBodyType>

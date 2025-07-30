import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { usernameSchema } from '../utils/username'

export const authenticateBodySchema = z.object({
  emailOrUsername: z.union([emailSchema, usernameSchema]),
  password: z.string().nonempty(),
})

export type AuthenticaticationSchemaType = z.infer<
  typeof authenticateBodySchema
>

import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { usernameSchema } from '../utils/username'

export const authenticateBodySchema = z.object({
  emailOrUsername: z.union([emailSchema, usernameSchema]),
  password: nonemptyTextSchema,
})

export type AuthenticaticationSchemaType = z.infer<
  typeof authenticateBodySchema
>

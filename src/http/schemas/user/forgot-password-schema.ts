import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { usernameSchema } from '../utils/username'

export const forgotPasswordSchema = z.object({
  login: z.union([emailSchema, usernameSchema]),
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

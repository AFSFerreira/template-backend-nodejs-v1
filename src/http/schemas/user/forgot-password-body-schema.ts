import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { usernameSchema } from '../utils/username'

export const forgotPasswordBodySchema = z.object({
  login: z.union([emailSchema, usernameSchema]),
})

export type ForgotPasswordBodySchemaType = z.infer<
  typeof forgotPasswordBodySchema
>

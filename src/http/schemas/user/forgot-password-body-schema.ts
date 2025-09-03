import { z } from 'zod'
import { emailSchema } from '../utils/email-schema'
import { usernameSchema } from '../utils/username-schema'

export const forgotPasswordBodySchema = z.object({
  login: z.union([emailSchema, usernameSchema]),
})

export type ForgotPasswordBodySchemaType = z.infer<
  typeof forgotPasswordBodySchema
>

import { z } from 'zod'
import { usernameSchema } from '../utils/components/username-schema'
import { emailSchema } from '../utils/primitives/email-schema'

export const forgotPasswordBodySchema = z.object({
  login: z.union([emailSchema, usernameSchema]),
})

export type ForgotPasswordBodySchemaType = z.infer<typeof forgotPasswordBodySchema>

import { resetPasswordTokenSchema } from '@schemas/utils/generic-components/reset-password-token-schema'
import { z } from 'zod'
import { passwordSchema } from '../utils/generic-components/password-schema'

export const resetPasswordBodySchema = z.object({
  newPassword: passwordSchema,
  token: resetPasswordTokenSchema,
})

export type ResetPasswordBodySchemaType = z.infer<typeof resetPasswordBodySchema>

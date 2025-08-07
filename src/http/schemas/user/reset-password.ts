import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { passwordSchema } from '../utils/password'

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  token: nonemptyTextSchema,
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

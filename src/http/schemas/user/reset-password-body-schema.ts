import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { passwordSchema } from '../utils/password'

export const resetPasswordBodySchema = z.object({
  newPassword: passwordSchema,
  token: nonemptyTextSchema,
})

export type ResetPasswordBodySchemaType = z.infer<
  typeof resetPasswordBodySchema
>

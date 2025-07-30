import { z } from 'zod'
import { passwordSchema } from '../utils/password'

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  token: z.string().nonempty(),
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

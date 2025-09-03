import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { z } from 'zod'
import { passwordSchema } from '../utils/password-schema'

export const resetPasswordBodySchema = z.object({
  newPassword: passwordSchema,
  token: z.hex().length(RANDOM_BYTES_NUMBER * 2),
})

export type ResetPasswordBodySchemaType = z.infer<
  typeof resetPasswordBodySchema
>

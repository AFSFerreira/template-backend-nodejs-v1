import { z } from 'zod'
import { PASSWORD_REGEX } from '@/constants/regex'

export const resetUserPasswordSchema = z.object({
  newPassword: z
    .string()
    .nonempty()
    .regex(
      PASSWORD_REGEX,
      'The password must contain at least 8 characters, one uppercase letter, one numeric digit and one special character.',
    ),
  token: z.string().nonempty(),
})

export type ResetUserPasswordSchemaType = z.infer<
  typeof resetUserPasswordSchema
>

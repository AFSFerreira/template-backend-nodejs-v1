import { passwordSchema } from '@lib/zod/utils/generic-components/password-schema'
import { resetPasswordTokenSchema } from '@lib/zod/utils/generic-components/reset-password-token-schema'
import { z } from 'zod'

export const resetPasswordBodySchema = z.object({
  newPassword: passwordSchema,
  token: resetPasswordTokenSchema,
})

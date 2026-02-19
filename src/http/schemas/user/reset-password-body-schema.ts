import { resetPasswordTokenSchema } from '@lib/zod/utils/generic-components/reset-password-token-schema'
import { z } from 'zod'
import { passwordSchema } from '../../../lib/zod/utils/generic-components/password-schema'

export const resetPasswordBodySchema = z.object({
  newPassword: passwordSchema,
  token: resetPasswordTokenSchema,
})

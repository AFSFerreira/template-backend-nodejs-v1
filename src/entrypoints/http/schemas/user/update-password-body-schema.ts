import { passwordSchema } from '@lib/zod/utils/generic-components/password-schema'
import { z } from 'zod'

export const changePasswordBodySchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
})

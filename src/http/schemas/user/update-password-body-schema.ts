import { passwordSchema } from '@schemas/utils/generic-components/password-schema'
import { z } from 'zod'

export const updatePasswordBodySchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
})

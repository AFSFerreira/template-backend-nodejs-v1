import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { z } from 'zod'

export const forgotPasswordBodySchema = z.object({
  login: emailSchema,
})

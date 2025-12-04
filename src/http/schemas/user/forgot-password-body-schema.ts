import { z } from 'zod'
import { emailSchema } from '../utils/generic-components/email-schema'

export const forgotPasswordBodySchema = z.object({
  login: emailSchema,
})

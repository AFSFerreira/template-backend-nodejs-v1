import { emailSchema } from '@schemas/utils/generic-components/email-schema'
import { z } from 'zod'

export const requestEmailChangeBodySchema = z.object({
  oldEmail: emailSchema,
  newEmail: emailSchema,
})

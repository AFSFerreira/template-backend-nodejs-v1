import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { z } from 'zod'

export const requestEmailChangeBodySchema = z.object({
  newEmail: emailSchema,
})

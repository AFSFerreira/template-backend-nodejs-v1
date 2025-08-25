import { emailSchema } from '@schemas/utils/email'
import z from 'zod'
import { usernameSchema } from '../utils/username'

export const checkAvailabilityQuerySchema = z.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
})

export type CheckAvailabilityQuerySchemaType = z.infer<
  typeof checkAvailabilityQuerySchema
>

import z from 'zod'
import { emailSchema } from '../utils/email'

export const checkEmailAvailabilitySchema = z.object({
  email: emailSchema,
})

export type checkEmailAvailabilitySchemaType = z.infer<
  typeof checkEmailAvailabilitySchema
>

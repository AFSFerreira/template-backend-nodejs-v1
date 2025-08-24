import z from 'zod'
import { emailSchema } from '../utils/email'

export const checkEmailAvailabilityBodySchema = z.object({
  email: emailSchema,
})

export type CheckEmailAvailabilityBodySchemaType = z.infer<
  typeof checkEmailAvailabilityBodySchema
>

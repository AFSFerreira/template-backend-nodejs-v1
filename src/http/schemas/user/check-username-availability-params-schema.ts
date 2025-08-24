import z from 'zod'
import { usernameSchema } from '../utils/username'

export const checkUsernameAvailabilityBodySchema = z.object({
  username: usernameSchema,
})

export type CheckEmailAvailabilityBodySchemaType = z.infer<
  typeof checkUsernameAvailabilityBodySchema
>

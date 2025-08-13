import z from 'zod'
import { usernameSchema } from '../utils/username'

export const checkUsernameAvailabilitySchema = z.object({
  username: usernameSchema,
})

export type checkEmailAvailabilitySchemaType = z.infer<
  typeof checkUsernameAvailabilitySchema
>
